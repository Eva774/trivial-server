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
import { RankingRound } from './Rounds/RankingRound';

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
            const liefdeRound = questions[0];
            const partyRound = questions[1];
            const sixtyRound = questions[2];
            const answerRound1 = questions[3];

            const hateRound = questions[4];
            const positieRound = questions[5];
            const colorRound = questions[6];
            const answerRound2 = questions[7];


            this.rounds = [
                new WelcomeRound(),
                new TalkingRound("Welkom"),
                new MixRound(liefdeRound.name, liefdeRound.questions, 1),
                new MediaRound(partyRound.name, MediaRoundType.Movie ,partyRound.questions, 2),
                new MixRound(sixtyRound.name, sixtyRound.questions, 3),
                new PauseRound(),
                new TalkingRound("Welkom terug"),
                new AnswerRound(answerRound1.name, answerRound1.questions,3),
                new TalkingRound(""),
                new RankingRound(),
                new MixRound(hateRound.name, hateRound.questions, 4),
                new TextRound(positieRound.name, positieRound.questions, 5),
                new MixRound(colorRound.name, colorRound.questions, 6),
                new PauseRound(),
                new TalkingRound(),
                new AnswerRound(answerRound2.name, answerRound2.questions,3),
                new RankingRound(),
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

    public displayQuestion(){
        log.debug('displayQuestion');
        if (this.getState().roundState.roundType === RoundType.MediaRound) {
            this.getCurrentRound().displayQuestion();
            this.emitGameStateUpdate();
        }
    }

    public hideQuestion(){
        log.debug('hideQuestion');
        if (this.getState().roundState.roundType === RoundType.MediaRound) {
            this.getCurrentRound().hideQuestion();
            this.emitGameStateUpdate();
        }
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

    public setInputRanking(inputRanking: string) {
        log.debug('setInputRanking', inputRanking);
        this.rounds.forEach( round => {
            if (round.getState().roundType === RoundType.RankingRound) {
                (round as RankingRound).setInputRanking(inputRanking);
            }
        })
        this.emitGameStateUpdate();
    }
    public getState(): GameState {
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
