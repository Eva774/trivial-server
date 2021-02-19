import { Round } from './Round';
import { log } from '../Log';
import { RankingRoundState } from '../../../trivial-client/src/models/Rounds/RankingRoundState';
import { RoundType } from '../../../trivial-client/src/models/RoundType';

export class RankingRound extends Round {

    private state: RankingRoundState;

    constructor() {
        super();
        this.state = {
            roundName: "Tussenstand",
            roundType: RoundType.RankingRound,
            currentQuestionIndex: -1,
            inputRanking: "",
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
        if (this.state.currentQuestionIndex < 5) {
            this.state.currentQuestionIndex++;
        }
    }

    public setInputRanking(inputRanking: string) {
        this.state.inputRanking = inputRanking;
    }
    public displayQuestion(): void {}
    public hideQuestion(): void {}
}
