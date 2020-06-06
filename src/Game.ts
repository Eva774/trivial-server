import { EventEmitter } from 'events';
import { GameState } from '../../dsptw-client/src/models/GameState';
import { PlayerState } from '../../dsptw-client/src/models/PlayerState';
import { log } from './Log';
import { CollectiefGeheugen } from './Rounds/CollectiefGeheugen';
import { DrieZesNegen } from './Rounds/DrieZesNegen';
import { Finale } from './Rounds/Finale';
import { Gallerij } from './Rounds/Gallerij';
import { OpenDeur } from './Rounds/OpenDeur';
import { Puzzel } from './Rounds/Puzzel';
import { Round } from './Rounds/Round';
import { ViewType } from '../../dsptw-client/src/models/ViewType';

export class Game extends EventEmitter {

    private playerOrder: number[] = [0, 1, 2];
    private playerOrderIndex: number = 0;
    private playerIndex: number = 0;
    // TODO get initial state from config
    private players: PlayerState[] = [
        {
            name: 'Nikki',
            time: 61000,
        },
        {
            name: 'Mei Li',
            time: 60000,
        },
        {
            name: 'Victor',
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

    public startTime() {
        log.debug('startTime');
        this.timerIsRunning = true;
        this.timerStarted = Date.now();
        this.timerTimeout = setTimeout(this.stopTime.bind(this), this.getCurrentPlayer().time);
        this.emitUpdate();
    }

    public stopTime() {
        log.debug('stopTime');
        this.timerIsRunning = false;
        this.getCurrentPlayer().time -= (Date.now() - this.timerStarted);
        if (this.timerTimeout) {
            clearTimeout(this.timerTimeout);
        }
        this.emitUpdate();
    }

    public correctAnswer(foundIndex?: number, playerIndex = this.playerIndex) {
        log.debug('correctAnswer', { foundIndex, playerIndex });
        const result = this.getCurrentRound().correctAnswer(foundIndex);
        if (result.scoreForPlayer) {
            this.addTimeToPlayer(playerIndex, result.scoreForPlayer);
        }
        if (result.scoreForOtherPlayer) {
            this.addTimeToPlayer(this.getOtherPlayerIndex(playerIndex), result.scoreForOtherPlayer);
        }
        this.emitUpdate();
    }

    public nextQuestion() {
        log.debug('nextQuestion');
        this.getCurrentRound().nextQuestion();
        this.emitUpdate();
    }

    public setCurrentQuestion(questionIndex: number) {
        log.debug('setCurrentQuestion', questionIndex);
        const currentRound = this.getCurrentRound();
        if (currentRound instanceof OpenDeur) {
            (currentRound as OpenDeur).setCurrentQuestion(questionIndex);
            this.emitUpdate();
        } else {
            log.warn('Calling setCurrentQuestion not on round OpenDeur!');
        }
    }

    public setView(view: ViewType) {
        log.debug('setView', view);
        const currentRound = this.getCurrentRound();
        // TODO add other rounds using the image view
        if (currentRound instanceof OpenDeur) {
            (currentRound as OpenDeur).setView(view);
            this.emitUpdate();
        } else {
            log.warn('Calling setView not on round OpenDeur!');
        }
    }

    public nextImage() {
        log.debug('nextImage');
        const currentRound = this.getCurrentRound();
        if (currentRound instanceof Gallerij) {
            currentRound.nextImage();
        }
        this.emitUpdate();
    }

    public nextRound() {
        log.debug('nextRound');
        this.roundIndex++;
        this.calculatePlayerOrder();
        this.playerOrderIndex = 0;
        if (this.getCurrentRound() instanceof Finale) {
            this.selectFinalPlayers();
        }
        this.playerIndex = this.playerOrder[this.playerOrderIndex];
        this.emitUpdate();
    }

    public nextPlayer() {
        log.debug('nextPlayer');
        this.playerOrderIndex = (this.playerOrderIndex + 1) % this.playerOrder.length;
        this.playerIndex = this.playerOrder[this.playerOrderIndex];
        this.emitUpdate();
    }

    public setPlayerName(playerIndex: number, name: string) {
        this.players[playerIndex].name = name;
        this.emitUpdate();
    }

    public setPlayerTime(playerIndex: number, time: number) {
        this.players[playerIndex].time = time;
        this.emitUpdate();
    }

    public getState(): GameState {
        return {
            currentPlayers: this.playerOrder,
            currentPlayer: this.playerIndex,
            players: this.players,
            roundState: this.getCurrentRound().getState(),
            timerIsRunning: this.timerIsRunning,
        };
    }

    private emitUpdate() {
        const gameState = this.getState();
        log.debug('gameStateUpdate', gameState);
        this.emit('gameStateUpdate', gameState);
    }

    private calculatePlayerOrder() {
        this.playerOrder.sort((a, b) => this.players[a].time - this.players[b].time);
    }

    private selectFinalPlayers() {
        log.debug('Selecting final players, removing player with HIGHEST time');
        // TODO add select lowest or highest in config
        // get index of player with highest time
        let playerWithLowestTimeIndex = 0;
        for (let i = 1; i < this.players.length; i++) {
            if (this.players[i].time > this.players[playerWithLowestTimeIndex].time) {
                playerWithLowestTimeIndex = i;
            }
        }
        const playerOrderIndex = this.playerOrder.indexOf(playerWithLowestTimeIndex);
        this.playerOrder.splice(playerOrderIndex, 1);

        const winner = this.players[playerWithLowestTimeIndex];
        log.info('player', winner.name, 'won with a time of', winner.time);
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
        this.players[player].time += time * 1000;
    }

    private getCurrentRound(): Round {
        return this.rounds[this.roundIndex];
    }
}
