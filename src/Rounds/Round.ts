import { RoundState } from '../../../trivial-client/src/models/Rounds/RoundState';

export abstract class Round {

    public abstract previousQuestion(): void;

    public abstract nextQuestion(): void;

    public abstract getState(): RoundState;

    public abstract displayQuestion(): void;

}
