import { Round } from './Round';
import { log } from '../Log';
import { MediaRoundState } from '../../../client/src/models/Rounds/MediaRoundState';
import { RoundType } from '../../../client/src/models/RoundType';

export class MediaRound extends Round {

    private state: MediaRoundState;

    constructor(roundName: string, questions: any, roundNumber: number) {
        super();
        this.state = {
            roundName,
            roundNumber,
            roundType: RoundType.MediaRound,
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
