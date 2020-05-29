import { RoundName } from '../models/RoundName';
import { DrieZesNegenState } from '../models/Rounds/DrieZesNegenState';
import { Round } from './Round';

export class DrieZesNegen extends Round {

    private state: DrieZesNegenState;

    constructor() {
        super(RoundName.DrieZesNegen);
        this.state = {
            currentQuestionIndex: 0,
            questions: [
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg1',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg2',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg3',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg4',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg5',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg6',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg7',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg8',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg9',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg10',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg11',
                },
                {
                    answer: 'veel mijne man',
                    question: 'hoeveel patatten enal zeg12',
                },
            ],
        };
    }

    public getState() {
        return this.state;
    }

    public correctAnswer() {
        if (this.state.currentQuestionIndex % 3 === 2) {
            this.state.currentQuestionIndex++;
            return { scoreForPlayer: 10 };
        }
        this.state.currentQuestionIndex++;

        return {};
    }
}
