import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { PuzzelState } from '../../../dsptw-client/src/models/Rounds/PuzzelState';
import { LowestTimeRound } from './LowestTimeRound';

export class Puzzel extends LowestTimeRound {

    private state: PuzzelState;

    constructor(players: PlayerState[]) {
        super(players);
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
                    grid: [
                        {
                            answerIndex: 2,
                            text: 'Gele wortel1',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen3',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten3',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel2',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen1',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten1',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen2',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel3',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten2',
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
                    grid: [
                        {
                            answerIndex: 1,
                            text: 'Aardappelen1',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen2',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel2',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel3',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten3',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten1',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten2',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel1',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen3',
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
                    grid: [
                        {
                            answerIndex: 0,
                            text: 'Patatten3',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen1',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel3',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen3',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel2',
                        },
                        {
                            answerIndex: 2,
                            text: 'Gele wortel1',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten2',
                        },
                        {
                            answerIndex: 1,
                            text: 'Aardappelen2',
                        },
                        {
                            answerIndex: 0,
                            text: 'Patatten1',
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

    public showAllAnswers(): void {
        this.state.puzzles[this.state.currentPuzzleIndex].answers.forEach(answer => {
            answer.found = true;
        })
    }

}
