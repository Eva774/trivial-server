import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { Round } from './Round';
import { log } from '../Log';
import { TextRoundState } from '../../../dsptw-client/src/models/Rounds/TextRoundState';
import { RoundType } from '../../../dsptw-client/src/models/RoundType';

export class TextRound extends Round {

    private state: TextRoundState;

    constructor(questions: any) {
        super();
        this.state = {
            roundName: RoundName.DrieZesNegen,
            roundType: RoundType.TextRound,
            currentQuestionIndex: -1,
            questions
        };
    }

    public getState() {
        return this.state;
    }

    public previousQuestion(): void {
        throw new Error('Method not implemented.');
    }

    public nextQuestion() {
        this.state.currentQuestionIndex++;
    }

    public showAllAnswers(): void {
        log.error('Cannot show all answers on round DrieZesNegen');
    }
}
