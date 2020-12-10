import { Round } from './Round';
import { AnswerRoundState } from '../../../trivial-client/src/models/Rounds/AnswerRoundState';
import { RoundType } from '../../../trivial-client/src/models/RoundType';
import { log } from '../Log';

export class AnswerRound extends Round {

    private state: AnswerRoundState;

    constructor(roundName: string="",questions: any,roundNumber: number) {
        super();
        this.state = {
            roundName,
            roundNumber,
            roundType: RoundType.AnswerRound,
            currentQuestionIndex: -1,
            questions
        };
    }

    public getState() {
        return this.state;
    }

    public previousQuestion(): void {
        if (this.state.currentQuestionIndex >= 0) {
            this.state.currentQuestionIndex--;
        }
        else {
            log.error("dat gaan we niet doen, foemp")
        }
    }

    public nextQuestion() {
        if (this.state.currentQuestionIndex < this.state.questions.length) {
            this.state.currentQuestionIndex++;
        }
    }

}
