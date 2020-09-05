export abstract class Round {

    public abstract previousQuestion(): void;

    public abstract nextQuestion(): void;

    public abstract getState(): any;

}
