export abstract class Round {

    public abstract correctAnswer(foundIndex?: number): { scoreForPlayer?: number, scoreForOtherPlayer?: number };

    public abstract nextQuestion(): void;

    public abstract getState(): any;
}
