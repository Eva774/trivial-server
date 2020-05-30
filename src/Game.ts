import { EventEmitter } from 'events';
import { GameState } from './models/GameState';
import { PlayerState } from './models/PlayerState';
import { CollectiefGeheugen } from './Rounds/CollectiefGeheugen';
import { DrieZesNegen } from './Rounds/DrieZesNegen';
import { Finale } from './Rounds/Finale';
import { Gallerij } from './Rounds/Gallerij';
import { OpenDeur } from './Rounds/OpenDeur';
import { Puzzel } from './Rounds/Puzzel';
import { Round } from './Rounds/Round';
import { log } from './Log';

export class Game extends EventEmitter {

    private playerOrder: number[] = [0, 1, 2];
    private playerOrderIndex: number = 0;
    private playerIndex: number = 0;
    // TODO get initial state from config
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
    private roundIndex: number = 0; // TODO read from config to skip rounds
    private rounds = [
        new DrieZesNegen(),
        new OpenDeur(),
        new Puzzel(),
        new Gallerij(),
        new CollectiefGeheugen(),
        new Finale(),
    ];
    private timerIsRunning: boolean = false;
    private timerTimeout?: NodeJS.Timeout;
    private timerStarted: number = 0;

    constructor() {
        super();
    }

    public getState(): GameState {
        return {
            currentPlayer: this.playerIndex,
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

    public correctAnswer(foundIndex?: number, playerIndex = this.playerIndex) {
        const result = this.getCurrentRound().correctAnswer(foundIndex);
        if (result.scoreForPlayer) {
            this.addTimeToPlayer(playerIndex, result.scoreForPlayer);
        }
        if (result.scoreForOtherPlayer) {
            this.addTimeToPlayer(this.getOtherPlayerIndex(playerIndex), result.scoreForOtherPlayer);
        }
    }

    public nextQuestion() {
        this.getCurrentRound().nextQuestion();
    }

    public nextImage() {
        const currentRound = this.getCurrentRound();
        if (currentRound instanceof Gallerij) {
            currentRound.nextImage();
        }
    }

    public nextRound() {
        this.roundIndex++;
        this.calculatePlayerOrder();
        this.playerOrderIndex = 0;
        this.emitUpdate();
    }

    public nextPlayer() {
        this.playerOrderIndex = (this.playerOrderIndex + 1) % this.playerOrder.length;
        this.playerIndex = this.playerOrder[this.playerOrderIndex];
        this.emitUpdate();
    }

    private emitUpdate() {
        this.emit('gameStateUpdate', this.getState());
    }

    private calculatePlayerOrder() {
        this.playerOrder.sort((a, b) => this.players[a].time - this.players[b].time);
    }

    private selectFinalPlayers() {
        // TODO add select lowest or highest in config
        // get index of player with lowest time
        let playerWithLowestTimeIndex = 0;
        for (let i = 1; i < this.players.length; i++) {
            if (this.players[i].time < this.players[playerWithLowestTimeIndex].time) {
                playerWithLowestTimeIndex = i;
            }
        }
        const playerOrderIndex = this.playerOrder.indexOf(playerWithLowestTimeIndex);
        this.playerOrder.splice(playerOrderIndex, 1);
    }

    /**
     * Only to be called in the final round when there are two players left.
     */
    private getOtherPlayerIndex(playerIndex: number) {
        if (!(this.getCurrentRound() instanceof Finale)) {
            log.warn('WE ZITTEN NIET IN DE FINaLE AAaAAA');
        }

        if (this.playerOrder.indexOf(playerIndex) === 0) {
            return 1;
        } else {
            return 0;
        }
        // return this.playerOrder[1 - this.playerOrder.indexOf(playerIndex)]; // if you are ninja
    }

    private getCurrentPlayer() {
        return this.players[this.playerIndex];
    }

    private addTimeToPlayer(player: number, time: number) {
        this.players[player].time += time;
    }

    private getCurrentRound(): Round {
        return this.rounds[this.roundIndex];
    }
}
