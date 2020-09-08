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
import { TextRound } from './Rounds/DrieZesNegen';
import { setOBSScene, openOBSConnection } from './Obs';
import { ObsScene } from '../../client/src/models/ObsScene';

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
            const nerdCultuurVragen = questions[0];
            this.rounds = [
                new WelcomeRound(),
                new TextRound(nerdCultuurVragen),
                new PauseRound()
            ]
            log.info(`Questions loaded successfully`)
        } catch (error) {
            log.error(error)
            throw "Invalid episode selected.";
        }
    }

    public previousQuestion() {
        log.debug('previousQuestion');

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
            const currentRoundType = this.getCurrentRound().getState().roundType;
            switch (currentRoundType) {
                case RoundType.TextRound:
                    setOBSScene(ObsScene.TextRound);
                    break;
                case RoundType.MediaRound:
                    setOBSScene(ObsScene.MediaRound);
                    break;
                default:
                    setOBSScene(ObsScene.Blank);
                    break;
            }
            this.roundIndex++;
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
