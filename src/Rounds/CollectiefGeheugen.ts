import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { CollectiefGeheugenState } from '../../../dsptw-client/src/models/Rounds/CollectiefGeheugenState';
import { LowestTimeRound } from './LowestTimeRound';

export class CollectiefGeheugen extends LowestTimeRound {

    private state: CollectiefGeheugenState;

    constructor(players: PlayerState[]) {
        super(players);
        this.state = {
            roundName: RoundName.CollectiefGeheugen,
            currentQuestionIndex: 0,
            questions: [
                {
                    answers: [
                        {
                            answer: 'Gebakken patatten',
                            found: false,
                        },
                        {
                            answer: 'Gekookte patatten',
                            found: false,
                        },
                        {
                            answer: 'Puree',
                            found: false,
                        },
                        {
                            answer: 'Kroketten',
                            found: false,
                        },
                        {
                            answer: 'Frietjes',
                            found: false,
                        },
                    ],
                    videoUrl: 'aardappelen.mp4',
                },
                {
                    answers: [
                        {
                            answer: 'Gebakken patatten',
                            found: false,
                        },
                        {
                            answer: 'Gekookte patatten',
                            found: false,
                        },
                        {
                            answer: 'Puree',
                            found: false,
                        },
                        {
                            answer: 'Kroketten',
                            found: false,
                        },
                        {
                            answer: 'Frietjes',
                            found: false,
                        },
                    ],
                    videoUrl: 'aardappelen.mp4',
                },
                {
                    answers: [
                        {
                            answer: 'Gebakken patatten',
                            found: false,
                        },
                        {
                            answer: 'Gekookte patatten',
                            found: false,
                        },
                        {
                            answer: 'Puree',
                            found: false,
                        },
                        {
                            answer: 'Kroketten',
                            found: false,
                        },
                        {
                            answer: 'Frietjes',
                            found: false,
                        },
                    ],
                    videoUrl: 'aardappelen.mp4',
                },
            ],
        };
    }

    public correctAnswer(answerIndex: number) {
        const { answers } = this.state.questions[this.state.currentQuestionIndex];

        let score = 10;
        answers.forEach((answer) => {
            if (answer.found) {
                score += 10;
            }
        });
        answers[answerIndex].found = true;
        answers[answerIndex].score = score;
        return { scoreForPlayer: score };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion() {
        this.state.currentQuestionIndex++;
    }
}
