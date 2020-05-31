import { RoundName } from '../../../dsptw-common/models/RoundName';
import { CollectiefGeheugenState } from '../../../dsptw-common/models/Rounds/CollectiefGeheugenState';
import { Round } from './Round';

export class CollectiefGeheugen extends Round {

    private state: CollectiefGeheugenState;

    constructor() {
        super();
        this.state = {
            roundName: RoundName.Gallerij,
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
