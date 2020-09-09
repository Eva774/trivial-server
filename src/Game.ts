import fs from 'fs';
import { EventEmitter } from 'events';
import { GameState } from '../../client/src/models/GameState';
import { PresenterState } from '../../client/src/models/PresenterState';
import { log } from './Log';
import { Round } from './Rounds/Round';
import { config } from './Config';
import { GameEmitType } from './GameEmitType';
import { PauseRound } from './Rounds/PauseRound';
import { RoundType } from '../../client/src/models/RoundType';
import { WelcomeRound } from './Rounds/WelcomeRound';
import { TextRound } from './Rounds/TextRound';
import { MediaRound } from './Rounds/MediaRound';
import { setOBSScene, openOBSConnection } from './Obs';

export class Game extends EventEmitter {

    private presenters: PresenterState[];
    private roundIndex: number = 0;
    private rounds = Array<Round>();

    constructor() {
        super();
        this.rounds = [];
        this.presenters = [
            {
                cameraLink: "",
                name: "Lotte"
            },
            {
                cameraLink: "",
                name: "Sebastiaan"
            }
        ];
        openOBSConnection();
    }

    public async loadEpisode() {
        try {
            log.info(`Loading episode from ${config.staticAssets}/questions.json`)
            const questions = JSON.parse(fs.readFileSync(`${config.staticAssets}/questions.json`).toString());
            const nerdCultuurRound = questions[0];
            const sportRound = questions[1];
            const muziekRound = questions[2];
            const wiskundeRound = questions[3];
            const algemeneKennisRound = questions[4];
            const fotoRound = questions[5];

            this.rounds = [
                new WelcomeRound(),
                new TextRound(nerdCultuurRound.name, nerdCultuurRound.questions, 1),
                new TextRound(sportRound.name, sportRound.questions, 2),
                new MediaRound(muziekRound.name, muziekRound.questions, 3),
                new PauseRound(),
                new TextRound(wiskundeRound.name, wiskundeRound.questions, 4),
                new TextRound(algemeneKennisRound.name, algemeneKennisRound.questions, 5),
                new MediaRound(fotoRound.name, fotoRound.questions, 6),
            ]
            log.info(`Questions loaded successfully`)
        } catch (error) {
            log.error(error)
            throw "Invalid episode selected.";
        }
    }

    public previousQuestion() {
        log.debug('previousQuestion');
        this.getCurrentRound().previousQuestion();
        this.emitGameStateUpdate();
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
            setOBSScene(this.getCurrentRound().getState().roundType)
            this.emitGameStateUpdate();
        }
    }

    public setWelcomeTargetTime(targetTime: string) {
        log.debug('setWelcomeTargetTime', targetTime);
        this.rounds.forEach(round => {
            if (round.getState().roundType === RoundType.WelcomeRound) {
                const [targetHours, targetMinutes] = targetTime.split(':');
                const targetTimeDate = new Date(new Date().setHours(parseInt(targetHours), parseInt(targetMinutes), 0));
                (round as WelcomeRound).setTargetTime(targetTimeDate);
            }
        })
        this.emitGameStateUpdate();
    }
    public setPauseTargetTime(targetTime: string) {
        log.debug('setPauseTargetTime', targetTime);
        this.rounds.forEach(round => {
            if (round.getState().roundType === RoundType.PauseRound) {
                const [targetHours, targetMinutes] = targetTime.split(':');
                const targetTimeDate = new Date(new Date().setHours(parseInt(targetHours), parseInt(targetMinutes), 0));
                (round as PauseRound).setTargetTime(targetTimeDate);
            }
        })
        this.emitGameStateUpdate();
    }


    public getState(): GameState {
        const currentRound = this.getCurrentRound();
        return {
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
