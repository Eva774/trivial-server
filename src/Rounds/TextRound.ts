import { Round } from './Round';
import { log } from '../Log';
import { TextRoundState } from '../../../client/src/models/Rounds/TextRoundState';
import { RoundType } from '../../../client/src/models/RoundType';

export class TextRound extends Round {

    private state: TextRoundState;

    constructor(roundName: string, questions: any) {
        super();
        this.state = {
            roundName: roundName,
            roundType: RoundType.TextRound,
            currentQuestionIndex: -1,
            questions
        };
    }

    public getState() {
        return this.state;
    }

    public previousQuestion(): void {
        if (this.state.currentQuestionIndex < 0) {
            this.state.currentQuestionIndex--;
        }
        log.error("dat gaan we niet doen, foemp")
    }

    public nextQuestion() {
        if (this.state.currentQuestionIndex < this.state.questions.length) {
            this.state.currentQuestionIndex++;
        }
    }

}
