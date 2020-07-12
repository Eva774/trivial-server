import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { DrieZesNegenState } from '../../../dsptw-client/src/models/Rounds/DrieZesNegenState';
import { Round } from './Round';
import { log } from '../Log';

export class DrieZesNegen extends Round {

    private state: DrieZesNegenState;
    private currentPlayerId = 0;

    constructor(questions: any) {
        super();
        this.state = {
            roundName: RoundName.DrieZesNegen,
            currentQuestionIndex: 0,
            questions
        };
    }

    public correctAnswer() {
        if (this.state.currentQuestionIndex % 3 === 2) {
            return { scoreForPlayer: 10 };
        }

        return { scoreForPlayer: 0 };
    }

    public calculateNextStartingPlayer() {
        this.currentPlayerId = (this.currentPlayerId + 1) % 3;
    }

    public calculateNextPlayerToComplete() {
        this.currentPlayerId = (this.currentPlayerId + 1) % 3;
    }

    public getCurrentPlayerId(): number {
        return this.currentPlayerId;
    }

    public getState() {
        return this.state;
    }

    public nextQuestion() {
        log.debug(this.state.currentQuestionIndex)
        if (this.state.currentQuestionIndex < 11) {
            this.state.currentQuestionIndex++;
        }
    }

    public showAllAnswers(): void {
        log.error('Cannot show all answers on round DrieZesNegen');
    }
}
