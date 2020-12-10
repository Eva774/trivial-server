import fs from 'fs';
import { EventEmitter } from 'events';
import { GameState } from '../../trivial-client/src/models/GameState';
import { PresenterState } from '../../trivial-client/src/models/PresenterState';
import { log } from './Log';
import { Round } from './Rounds/Round';
import { config } from './Config';
import { GameEmitType } from './GameEmitType';
import { PauseRound } from './Rounds/PauseRound';
import { RoundType } from '../../trivial-client/src/models/RoundType';
import { WelcomeRound } from './Rounds/WelcomeRound';
import { TextRound } from './Rounds/TextRound';
import { MediaRound } from './Rounds/MediaRound';
import { setOBSScene, openOBSConnection } from './Obs';
import { MediaRoundType } from '../../trivial-client/src/models/Rounds/MediaRoundType';
import { TalkingRound } from './Rounds/TalkingRound';
import { EndRound } from './Rounds/EndRound';
import { MixRound } from './Rounds/MixRound';
import { AnswerRound } from './Rounds/AnswerRound';

export class Game extends EventEmitter {

    private presenters: PresenterState[] = [];
    private roundIndex: number = 0;
    private rounds = Array<Round>();

    constructor() {
        super();
        this.rounds = [];
        openOBSConnection()
    }

    public async loadEpisode() {
        try {
            log.info(`Loading episode from ${config.staticAssets}/questions.json`)
            const questions = JSON.parse(fs.readFileSync(`${config.staticAssets}/questions.json`).toString());
            const halloweenRound = questions[0];
            const natuurRound = questions[1];
            const filmRound = questions[2];
            const answerRound1 = questions[3];
            const trickOrTreatRound = questions[4];
            const mysterieRound = questions[5];
            const muziekRound = questions[6];
            const answerRound2 = questions[7];

            this.rounds = [
                new WelcomeRound(),
                new TalkingRound("Welkom"),
                new TextRound(halloweenRound.name, halloweenRound.questions, 1),
                new TextRound(natuurRound.name, natuurRound.questions, 2),
                new MixRound(filmRound.name, filmRound.questions, 3),
                new PauseRound(),
                new TalkingRound("Welkom terug"),
                new AnswerRound(answerRound1.name, answerRound1.questions,3),
                new TalkingRound("Tussenstand"),
                new TextRound(trickOrTreatRound.name, trickOrTreatRound.questions, 4),
                new TextRound(mysterieRound.name, mysterieRound.questions, 5),
                new MediaRound(muziekRound.name, MediaRoundType.Movie, muziekRound.questions, 6),
                new PauseRound(),
                new TalkingRound(),
                new AnswerRound(answerRound2.name, answerRound2.questions,3),
                new TalkingRound("Eindstand"),
                new EndRound(),
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
            this.emitGameStateUpdate();
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
            presenters: config.presenters,
            questionDuration: config.questionDuration,
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
