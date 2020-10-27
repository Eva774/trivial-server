import { Round } from './Round';
import { TalkingRoundState } from '../../../client/src/models/Rounds/TalkingRoundState';
import { RoundType } from '../../../client/src/models/RoundType';

export class TalkingRound extends Round {

    private state: TalkingRoundState;

    constructor(roundName: string="") {
        super();
        this.state = {
            roundName,
            roundType: RoundType.TalkingRound,
        };
    }

    public getState() {
        return this.state;
    }

    public previousQuestion(): void {
    }

    public nextQuestion() {
    }

}
