import { Round } from './Round';
import { log } from '../Log';
import { MediaRoundState } from '../../../trivial-client/src/models/Rounds/MediaRoundState';
import { RoundType } from '../../../trivial-client/src/models/RoundType';
import { MediaRoundType } from '../../../trivial-client/src/models/Rounds/MediaRoundType';

export class MediaRound extends Round {

    private state: MediaRoundState;

    constructor(roundName: string, mediaRoundType: MediaRoundType, questions: any, roundNumber: number) {
        super();
        this.state = {
            roundName,
            roundNumber,
            roundType: RoundType.MediaRound,
            mediaRoundType,
            currentQuestionIndex: -1,
            questions,
            displayQuestion: true,
        };
    }

    public getState() {
        return this.state;
    }

    public previousQuestion(): void {
        if (this.state.currentQuestionIndex >= 0) {
            this.state.currentQuestionIndex--;
            this.state.displayQuestion = true;
        } else {
            log.error("dat gaan we niet doen, foemp")
        }
    }

    public nextQuestion() {
        if (this.state.currentQuestionIndex < this.state.questions.length) {
            this.state.currentQuestionIndex++;
            this.state.displayQuestion = true;
        }
    }

    public displayQuestion():void {
        if (this.state.currentQuestionIndex >= 0 && this.state.currentQuestionIndex < this.state.questions.length) {
            this.state.displayQuestion = true;
        }
    }

    public hideQuestion():void {
        if (this.state.currentQuestionIndex >= 0 && this.state.currentQuestionIndex < this.state.questions.length) {
            this.state.displayQuestion = false;
        }
    }
}
