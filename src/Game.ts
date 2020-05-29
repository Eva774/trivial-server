import { EventEmitter } from 'events';
import { GameState } from './models/GameState';
import { PlayerState } from './models/PlayerState';
import { RoundName } from './models/RoundName';
import { DrieZesNegen } from './Rounds/DrieZesNegen';
import { Round } from './Rounds/Round';

export class Game extends EventEmitter {

    private playerOrder: number[] = [0, 1, 2];
    private currentPlayerIndex: number = 0;
    private currentPlayer: number = 0;
    private players: PlayerState[] = [
        {
            name: 'speler 1',
            time: 61000,
        },
        {
            name: 'speler 2',
            time: 60000,
        },
        {
            name: 'speler 3',
            time: 69000,
        },
    ];
    private currentRoundIndex: number = 0;
    private rounds = [
        new DrieZesNegen(),
    ];
    private timerIsRunning: boolean = false;
    private timerTimeout?: NodeJS.Timeout;
    private timerStarted: number = 0;

    constructor() {
        super();
    }

    public getState(): GameState {
        return {
            currentPlayer: this.currentPlayer,
            players: this.players,
            roundState: this.getCurrentRound().getState(),
            timerIsRunning: this.timerIsRunning,
        };
    }

    public startTime() {
        this.timerIsRunning = true;
        this.timerStarted = Date.now();
        this.timerTimeout = setTimeout(this.stopTime.bind(this), this.getCurrentPlayer().time);
        this.emitUpdate();
    }

    public stopTime() {
        this.timerIsRunning = false;
        this.getCurrentPlayer().time -= (Date.now() - this.timerStarted);
        if (this.timerTimeout) {
            clearTimeout(this.timerTimeout);
        }
        this.emitUpdate();
    }

    public correctAnswer() {
        const result = this.getCurrentRound().correctAnswer();
        if (result.scoreForPlayer) {
            this.addTimeToCurrentPlayer(result.scoreForPlayer);
        }
        if (result.scoreForOtherPlayer) {
            this.addTimeToPlayer(0, result.scoreForOtherPlayer);
        }
    }

    public nextRound() {
        this.currentRoundIndex++;
        this.calculatePlayerOrder();
        this.currentPlayerIndex = 0;
        this.emitUpdate();
    }

    private emitUpdate() {
        this.emit('gameStateUpdate', this.getState());
    }

    private calculatePlayerOrder() {
        this.playerOrder.sort((a, b) => this.players[a].time - this.players[b].time);
    }

    private nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerOrder.length;
        this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
        this.emitUpdate();
    }

    private getCurrentPlayer() {
        return this.players[this.currentPlayer];
    }

    private addTimeToCurrentPlayer(time: number) {
        this.addTimeToPlayer(this.currentPlayer, time);
    }

    private addTimeToPlayer(player: number, time: number) {
        this.players[player].time += time;
    }

    private getCurrentRound(): Round {
        return this.rounds[this.currentRoundIndex];
    }
}
