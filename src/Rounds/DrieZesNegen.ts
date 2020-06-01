import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { DrieZesNegenState } from '../../../dsptw-client/src/models/Rounds/DrieZesNegenState';
import { Round } from './Round';

export class DrieZesNegen extends Round {

    private state: DrieZesNegenState;

    constructor() {
        super();
        this.state = {
            roundName: RoundName.DrieZesNegen,
            currentQuestionIndex: 0,
            questions: [
                {
                    question: 'hoeveel patatten enal zeg1',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg2',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg3',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg4',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg5',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg6',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg7',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg8',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg9',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg10',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg11',
                    answer: 'veel mijne man',
                },
                {
                    question: 'hoeveel patatten enal zeg12',
                    answer: 'veel mijne man',
                },
            ],
        };
    }

    public correctAnswer() {
        if (this.state.currentQuestionIndex % 3 === 2) {
            return { scoreForPlayer: 10 };
        }

        return {};
    }

    public getState() {
        return this.state;
    }

    public nextQuestion() {
        this.state.currentQuestionIndex++;
    }
}
