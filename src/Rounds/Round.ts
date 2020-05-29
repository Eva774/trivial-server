import { RoundName } from '../models/RoundName';

export abstract class Round {

    protected roundName: RoundName;

    constructor(roundName: RoundName) {
        this.roundName = roundName;
    }

    public abstract correctAnswer(foundIndex?: number): { scoreForPlayer?: number, scoreForOtherPlayer?: number };

    public abstract nextQuestion(): void;

    public abstract getState(): any;
}
