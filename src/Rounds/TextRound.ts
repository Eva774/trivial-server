import { Round } from './Round';
import { log } from '../Log';
import { TextRoundState } from '../../../trivial-client/src/models/Rounds/TextRoundState';
import { RoundType } from '../../../trivial-client/src/models/RoundType';

export class TextRound extends Round {

    private state: TextRoundState;

    constructor(roundName: string, questions: any, roundNumber: number) {
        super();
        this.state = {
            roundName,
            roundNumber,
            roundType: RoundType.TextRound,
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
