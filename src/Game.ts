import fs from 'fs';
import { EventEmitter } from 'events';
import { GameState } from '../../dsptw-client/src/models/GameState';
import { PlayerState } from '../../dsptw-client/src/models/PlayerState';
import { ViewType } from '../../dsptw-client/src/models/ViewType';
import { log } from './Log';
import { CollectiefGeheugen } from './Rounds/CollectiefGeheugen';
import { DrieZesNegen } from './Rounds/DrieZesNegen';
import { Finale } from './Rounds/Finale';
import { Gallerij } from './Rounds/Gallerij';
import { LowestTimeRound } from './Rounds/LowestTimeRound';
import { OpenDeur } from './Rounds/OpenDeur';
import { Puzzel } from './Rounds/Puzzel';
import { Round } from './Rounds/Round';

export class Game extends EventEmitter {

    // TODO get initial state from config
    private players: PlayerState[];
    private roundIndex: number = 0; // TODO read from config to skip rounds
    private rounds = Array<Round>();
    private timerIsRunning: boolean = false;
    // private timerTimeout?: NodeJS.Timeout;
    private timerInterval?: NodeJS.Timer;
    // private timerStarted: number = 0;

    constructor(filename: string) {
        super();
        this.rounds = [];
        try {
            log.info(`Loading "./episodes/${filename}.json"`)
            const episode = JSON.parse(fs.readFileSync(`./episodes/${filename}.json`).toString());
            this.players = Object.values(episode.players)
                .map(player => (
                    {
                        time: 60000,
                        ...player as { name: string, cameraLink?: string }
                    }))

            this.rounds = [
                new DrieZesNegen(episode.rounds.drieZesNegen),
                new OpenDeur(this.players, episode.rounds.openDeur),
                new Puzzel(this.players, episode.rounds.puzzel),
                new Gallerij(this.players, episode.rounds.gallerij),
                new CollectiefGeheugen(this.players, episode.rounds.collectiefGeheugen),
                new Finale(this.players, episode.rounds.finale),
            ]
            log.info(`Episode ${filename} loaded successfully`)

        } catch (error) {
            throw "Invalid episode selected.";
        }
    }

    public startTime() {
        log.debug('startTime');
        this.timerIsRunning = true;
        // this.timerStarted = Date.now();
        // this.timerTimeout = setTimeout(this.stopTime.bind(this), this.getCurrentPlayer().time);
        this.timerInterval = setInterval(() => {
            this.getCurrentPlayer().time -= 200;
            this.emitUpdate();
        }, 200);
    }

    public stopTime() {
        log.debug('stopTime');
        this.timerIsRunning = false;
        // this.getCurrentPlayer().time -= (Date.now() - this.timerStarted);
        if (this.timerInterval) {
            clearTimeout(this.timerInterval);
        }
        this.emitUpdate();
    }

    public correctAnswer(foundIndex?: number, playerId = this.getCurrentRound().getCurrentPlayerId()) {
        log.debug('correctAnswer', { foundIndex, playerIndex: playerId });
        const result = this.getCurrentRound().correctAnswer(foundIndex);
        if ('scoreForPlayer' in result && result.scoreForPlayer) {
            this.addTimeToPlayer(playerId, result.scoreForPlayer);
        }
        if ('scoreForOtherPlayer' in result && result.scoreForOtherPlayer) {
            this.addTimeToPlayer(result.otherPlayerId, result.scoreForOtherPlayer);
        }
        this.emitUpdate();
    }

    public showAllAnswers() {
        log.debug('Showing all unanswered answers')
        this.getCurrentRound().showAllAnswers();
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
        } else if (currentRound instanceof CollectiefGeheugen) {
            (currentRound as CollectiefGeheugen).setCurrentQuestion(questionIndex);
            this.emitUpdate();
        } else {
            log.warn('Calling setCurrentQuestion not on round OpenDeur or Collectief Geheugen!');
        }
    }

    public setView(view: ViewType) {
        log.debug('setView', view);
        const currentRound = this.getCurrentRound();
        // TODO add other rounds using the image view
        if (currentRound instanceof OpenDeur) {
            (currentRound as OpenDeur).setView(view);
            this.emitUpdate();
        } else if (currentRound instanceof CollectiefGeheugen) {
            (currentRound as CollectiefGeheugen).setView(view);
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
        } else {
            log.warn('calling nextImage not on round "Gallerij"');
        }
        this.emitUpdate();
    }

    public nextRound() {
        log.debug('nextRound');
        if (this.roundIndex + 1 < this.rounds.length) {
            this.roundIndex++;
            const currentRound = this.getCurrentRound();
            if (currentRound instanceof LowestTimeRound) {
                currentRound.init();
            }

            this.emitUpdate();
        }
    }

    public nextStartingPlayer() {
        const currentRound = this.getCurrentRound();
        currentRound.calculateNextStartingPlayer();

        this.emitUpdate();
    }

    public nextPlayerToComplete() {
        const currentRound = this.getCurrentRound();
        currentRound.calculateNextPlayerToComplete();
        this.emitUpdate();
    }

    public setPlayerName(playerId: number, name: string) {
        this.players[playerId].name = name;
        this.emitUpdate();
    }

    public setPlayerTime(playerId: number, time: number) {
        this.players[playerId].time = time;
        this.emitUpdate();
    }

    public getState(): GameState {
        const currentRound = this.getCurrentRound();
        return {
            currentPlayers: (currentRound instanceof Finale) ? currentRound.currentPlayerIds : [0, 1, 2],
            currentPlayer: this.getCurrentRound().getCurrentPlayerId(),
            players: this.players,
            roundState: this.getCurrentRound().getState(),
            timerIsRunning: this.timerIsRunning,
        };
    }

    private emitUpdate() {
        const gameState = this.getState();
        log.debug('gameStateUpdate');
        this.emit('gameStateUpdate', gameState);
    }

    private getCurrentPlayer() {
        return this.players[this.getCurrentRound().getCurrentPlayerId()];
    }

    private addTimeToPlayer(player: number, time: number) {
        this.players[player].time += time * 1000;
    }

    private getCurrentRound(): Round {
        return this.rounds[this.roundIndex];
    }
}
