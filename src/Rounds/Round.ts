import { RoundState } from '../../../client/src/models/Rounds/RoundState';

export abstract class Round {

    public abstract previousQuestion(): void;

    public abstract nextQuestion(): void;

    public abstract getState(): RoundState;

}
