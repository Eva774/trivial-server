import fs from 'fs';
import { EventEmitter } from 'events';
import { GameState } from '../../dsptw-client/src/models/GameState';
import { PlayerState } from '../../dsptw-client/src/models/PlayerState';
import { ViewType } from '../../dsptw-client/src/models/ViewType';
import { log } from './Log';
import { CollectiefGeheugen } from './Rounds/CollectiefGeheugen';
import { DrieZesNegen } from './Rounds/DrieZesNegen';
import { Finale } from './Rounds/Finale';
import { Galerij } from './Rounds/Galerij';
import { LowestTimeRound } from './Rounds/LowestTimeRound';
import { OpenDeur } from './Rounds/OpenDeur';
import { Puzzel } from './Rounds/Puzzel';
import { Round } from './Rounds/Round';
import { Overzicht } from './Rounds/Overzicht';
import { config } from './Config';

export class Game extends EventEmitter {

    private players: PlayerState[];
    private roundIndex: number = 0;
    private rounds = Array<Round>();
    private timerIsRunning: boolean = false;
    // private timerTimeout?: NodeJS.Timeout;
    private timerInterval?: NodeJS.Timer;
    // private timerStarted: number = 0;

    constructor() {
        super();
        this.rounds = [];
        this.players = [];
    }

    public async loadEpisode(episodeNumber: number) {
        try {
            log.info(`Loading episode from ${config.staticAssets}/aflevering${episodeNumber}`)
            const episode = JSON.parse(fs.readFileSync(`${config.staticAssets}/aflevering${episodeNumber}/questions.json`).toString());
            const finale = JSON.parse(fs.readFileSync(`${config.staticAssets}/finale.json`).toString());

            this.players = [
                {
                    time: 60000,
                    name: "player 1"
                },
                {
                    time: 60000,
                    name: "player 2"
                },
                {
                    time: 60000,
                    name: "player 3"
                }
            ]
            this.rounds = [
                new Overzicht,
                new DrieZesNegen(episode.drieZesNegen),
                new Overzicht,
                new OpenDeur(this.players, episode.openDeur),
                new Overzicht,
                new Puzzel(this.players, episode.puzzel),
                new Overzicht,
                new Galerij(this.players, episode.galerij),
                new Overzicht,
                new CollectiefGeheugen(this.players, episode.collectiefGeheugen),
                new Overzicht,
                new Finale(this.players, finale),
                new Overzicht,
            ]
            log.info(`Episode ${episodeNumber} loaded successfully`)
            log.info(`First Finale question is "${finale.questions.splice(finale.questionIndex)[0].question}"`)
        } catch (error) {
            log.error(error)
            throw "Invalid episode selected.";
        }
    }

    public startTime() {
        if (!(this.getCurrentRound() instanceof Overzicht)) {
            log.debug('startTime');
            this.timerIsRunning = true;
            // this.timerStarted = Date.now();
            // this.timerTimeout = setTimeout(this.stopTime.bind(this), this.getCurrentPlayer().time);
            this.timerInterval = setInterval(() => {
                const newTime = this.getCurrentPlayer().time -= 200;
                if (newTime <= 0) {
                    this.getCurrentPlayer().time = 0;
                    this.stopTime();
                } else {
                    this.getCurrentPlayer().time = newTime;
                }
                this.emitUpdate();
            }, 200);
        }
    }

    public stopTime() {
        log.debug('stopTime');
        this.timerIsRunning = false;
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
        if (currentRound instanceof Galerij) {
            currentRound.nextImage();
        } else {
            log.warn('calling nextImage not on round "Galerij"');
        }
        this.emitUpdate();
    }

    public previousRound() {
        log.debug('previousRound')
        if (this.roundIndex > 0) {
            this.roundIndex--;
            const currentRound = this.getCurrentRound();
            if (currentRound instanceof LowestTimeRound || currentRound instanceof Finale) {
                currentRound.init();
            }
        }
        this.emitUpdate();
    }

    public nextRound() {
        log.debug('nextRound');
        if (this.roundIndex + 1 < this.rounds.length) {
            this.roundIndex++;
            const currentRound = this.getCurrentRound();
            if (currentRound instanceof LowestTimeRound || currentRound instanceof Finale) {
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

    public setPlayerCameraLink(playerId: number, cameraLink: string) {
        this.players[playerId].cameraLink = cameraLink;
        this.emitUpdate();
    }

    public getState(): GameState {
        const currentRound = this.getCurrentRound();
        return {
            episode: config.episode,
            currentPlayers: (currentRound instanceof Finale) ? currentRound.currentPlayerIds : [0, 1, 2],
            currentPlayer: this.getCurrentRound().getCurrentPlayerId(),
            players: this.players,
            roundState: this.getCurrentRound().getState(),
            timerIsRunning: this.timerIsRunning,
            presenter: {
                name: config.presenterName,
                cameraLink: config.presenterCamera,
            }
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
        let newTime = this.players[player].time + time * 1000;
        if (newTime <= 0) {
            this.stopTime();
            newTime = 0;
        }
        this.players[player].time = newTime;
    }

    private getCurrentRound(): Round {
        return this.rounds[this.roundIndex];
    }
}
