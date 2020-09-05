import fs from 'fs';
import { EventEmitter } from 'events';
import { GameState } from '../../dsptw-client/src/models/GameState';
import { PresenterState } from '../../dsptw-client/src/models/PresenterState';
import { log } from './Log';
import { Round } from './Rounds/Round';
import { config } from './Config';
import { GameEmitType } from './GameEmitType';

export class Game extends EventEmitter {

    private presenters: PresenterState[];
    private roundIndex: number = 0;
    private rounds = Array<Round>();

    constructor() {
        super();
        this.rounds = [];
        this.presenters = [];
    }

    public async loadEpisode(episodeNumber: number) {
        // try {
        //     log.info(`Loading episode from ${config.staticAssets}/aflevering${episodeNumber}`)
        //     const episode = JSON.parse(fs.readFileSync(`${config.staticAssets}/aflevering${episodeNumber}/questions.json`).toString());
        //     const finale = JSON.parse(fs.readFileSync(`${config.staticAssets}/finale.json`).toString());

        //     this.players = [
        //         {
        //             time: 60000,
        //             name: "player 1"
        //         },
        //         {
        //             time: 60000,
        //             name: "player 2"
        //         },
        //         {
        //             time: 60000,
        //             name: "player 3"
        //         }
        //     ]
        //     this.rounds = [
        //         new Overzicht,
        //         new DrieZesNegen(episode.drieZesNegen),
        //         new Overzicht,
        //         new OpenDeur(this.players, episode.openDeur),
        //         new Overzicht,
        //         new Puzzel(this.players, episode.puzzel),
        //         new Overzicht,
        //         new Galerij(this.players, episode.galerij),
        //         new Overzicht,
        //         new CollectiefGeheugen(this.players, episode.collectiefGeheugen),
        //         new Overzicht,
        //         new Finale(this.players, finale),
        //         new Overzicht,
        //     ]
        //     log.info(`Episode ${episodeNumber} loaded successfully`)
        //     log.info(`First Finale question is "${finale.questions.splice(finale.questionIndex)[0].question}"`)
        // } catch (error) {
        //     log.error(error)
        //     throw "Invalid episode selected.";
        // }
    }

    public previousQuestion() {

    }

    public nextQuestion() {
        log.debug('nextQuestion');
        this.getCurrentRound().nextQuestion();
        this.emitGameStateUpdate();
    }

    public previousRound() {
        log.debug('previousRound')
        if (this.roundIndex > 0) {
            this.roundIndex--;
        }
        this.emitGameStateUpdate();
    }

    public nextRound() {
        log.debug('nextRound');
        if (this.roundIndex + 1 < this.rounds.length) {
            this.roundIndex++;
            this.emitGameStateUpdate();
        }
    }
    public getState(): GameState {
        const currentRound = this.getCurrentRound();
        return {
            roundNumber: 0,
            roundState: this.getCurrentRound().getState(),
            presenters: this.presenters,
        }
    }

    private emitGameStateUpdate() {
        const gameState = this.getState();
        // log.debug(GameEmitType.GameStateUpdate);
        this.emit(GameEmitType.GameStateUpdate, gameState);
    }

    private getCurrentRound(): Round {
        return this.rounds[this.roundIndex];
    }
}
