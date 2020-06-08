export abstract class Round {

    // tslint:disable-next-line: max-line-length
    public abstract correctAnswer(foundIndex?: number): { scoreForPlayer: number } | { scoreForOtherPlayer: number, otherPlayerId: number };

    public abstract nextQuestion(): void;

    public abstract getState(): any;

    public abstract calculateNextStartingPlayer(): void;

    public abstract calculateNextPlayerToComplete(): void;

    public abstract getCurrentPlayerId(): number;
}
