import { RoundName } from '../models/RoundName';

export abstract class Round {

    protected roundName: RoundName;

    constructor(roundName: RoundName) {
        this.roundName = roundName;
    }

    public abstract correctAnswer(): { scoreForPlayer?: number, scoreForOtherPlayer?: number };

    public abstract getState(): { questions: any };
}
