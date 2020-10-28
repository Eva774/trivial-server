import { Round } from './Round';
import { log } from '../Log';
import { MixRoundState } from '../../../client/src/models/Rounds/MixRoundState';
import { RoundType } from '../../../client/src/models/RoundType';


export class MixRound extends Round {

    private state: MixRoundState;

    constructor(roundName: string, questions: any, roundNumber: number) {
        super();
        this.state = {
            roundName,
            roundNumber,
            roundType: RoundType.MixRound,
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
        } else {
            log.error("dat gaan we niet doen, foemp")
        }
    }

    public nextQuestion() {
        if (this.state.currentQuestionIndex < this.state.questions.length) {
            this.state.currentQuestionIndex++;
        }
    }

}
