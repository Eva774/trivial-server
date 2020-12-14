import { Round } from './Round';
import { WelcomeRoundState } from '../../../trivial-client/src/models/Rounds/WelcomeRoundState';
import { RoundType } from '../../../trivial-client/src/models/RoundType';

export class WelcomeRound extends Round {

    private state: WelcomeRoundState;

    constructor() {
        super();
        this.state = {
            roundName: "Welkom",
            roundType: RoundType.WelcomeRound,
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
    public displayQuestion(): void {}
    public setTargetTime(targetTime: Date) {
        this.state.targetTime = targetTime;
    }
}
