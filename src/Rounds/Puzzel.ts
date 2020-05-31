import { RoundName } from '../../../dsptw-common/models/RoundName';
import { PuzzelState } from '../../../dsptw-common/models/Rounds/PuzzelState';
import { Round } from './Round';

export class Puzzel extends Round {

    private state: PuzzelState;

    constructor() {
        super();
        this.state = {
            roundName: RoundName.Puzzel,
            currentPuzzleIndex: 0,
            puzzles: [
                {
                    answers: [{
                        found: false,
                        text: 'Patatten',
                    },
                    {
                        found: false,
                        text: 'Aardappelen',
                    },
                    {
                        found: false,
                        text: 'Gele wortel',
                    }],
                    grid: [{
                        answerIndex: 0,
                        text: 'Patatten1',
                    },
                    {
                        answerIndex: 0,
                        text: 'Patatten2',
                    }, {
                        answerIndex: 0,
                        text: 'Patatten3',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen1',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen2',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen3',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel1',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel2',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel3',
                    },
                    ],
                }, {
                    answers: [{
                        found: false,
                        text: 'Patatten',
                    },
                    {
                        found: false,
                        text: 'Aardappelen',
                    },
                    {
                        found: false,
                        text: 'Gele wortel',
                    }],
                    grid: [{
                        answerIndex: 0,
                        text: 'Patatten1',
                    },
                    {
                        answerIndex: 0,
                        text: 'Patatten2',
                    }, {
                        answerIndex: 0,
                        text: 'Patatten3',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen1',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen2',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen3',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel1',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel2',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel3',
                    },
                    ],
                }, {
                    answers: [{
                        found: false,
                        text: 'Patatten',
                    },
                    {
                        found: false,
                        text: 'Aardappelen',
                    },
                    {
                        found: false,
                        text: 'Gele wortel',
                    }],
                    grid: [{
                        answerIndex: 0,
                        text: 'Patatten1',
                    },
                    {
                        answerIndex: 0,
                        text: 'Patatten2',
                    }, {
                        answerIndex: 0,
                        text: 'Patatten3',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen1',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen2',
                    },
                    {
                        answerIndex: 1,
                        text: 'Aardappelen3',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel1',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel2',
                    },
                    {
                        answerIndex: 1,
                        text: 'Gele wortel3',
                    },
                    ],
                },
            ],

        };
    }

    public correctAnswer(foundIndex: number) {

        this.state.puzzles[this.state.currentPuzzleIndex].answers[foundIndex].found = true;
        return { scoreForPlayer: 30 };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion(): void {
        this.state.currentPuzzleIndex++;
    }

}
