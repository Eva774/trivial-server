import { Round } from './Round';
import { WelcomeRoundState } from '../../../client/src/models/Rounds/WelcomeRoundState';
import { RoundType } from '../../../client/src/models/RoundType';

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

    public setTargetTime(targetTime: Date) {
        this.state.targetTime = targetTime;
    }
}
