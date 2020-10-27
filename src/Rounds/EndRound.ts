import { Round } from './Round';
import { RoundType } from '../../../client/src/models/RoundType';
import { EndRoundState } from '../../../client/src/models/Rounds/EndRoundState';

export class EndRound extends Round {

    private state:EndRoundState = {
        roundType: RoundType.EndRound,
        roundName: "endround",
    };

    public getState() {
        return this.state;
    }

    public previousQuestion(): void {
    }

    public nextQuestion() {
    }

}
