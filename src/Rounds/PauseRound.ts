import { Round } from './Round';
import { PauseRoundState } from '../../../trivial-client/src/models/Rounds/PauseRoundState';
import { RoundType } from '../../../trivial-client/src/models/RoundType';

export class PauseRound extends Round {

    private state: PauseRoundState;

    constructor() {
        super();
        this.state = {
            roundName: "Pauze",
            roundType: RoundType.PauseRound,
            targetTime: new Date(),
        };
    }

    public getState() {
        return this.state;
    }

    public previousQuestion(): void {
    }

    public nextQuestion() {
    }

    public setTargetTime(targetTime: Date) {
        this.state.targetTime = targetTime;
    }
    public displayQuestion(): void {}
}
