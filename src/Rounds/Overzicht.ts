import { Round } from './Round';

export class Overzicht extends Round {
    public correctAnswer(foundIndex?: number | undefined): { scoreForPlayer: number; } | { scoreForOtherPlayer: number; otherPlayerId: number; } {
        return { scoreForPlayer: 0 }
    }
    public nextQuestion(): void {
    }
    public getState() {
        return {}
    }
    public calculateNextStartingPlayer(): void {
    }
    public calculateNextPlayerToComplete(): void {
    }
    public getCurrentPlayerId(): number {
        return 0;
    }
    public showAllAnswers(): void {
    }

}