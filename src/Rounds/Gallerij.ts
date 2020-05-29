import { RoundName } from '../models/RoundName';
import { GallerijState } from '../models/Rounds/GallerijState';
import { Round } from './Round';

export class Gallerij extends Round {

    private state: GallerijState;

    constructor() {
        super(RoundName.Gallerij);
        this.state = {
            currentImageIndex: 0,
            currentQuestionSeriesIndex: 0,
            questions: [
                [
                    {
                        answer: 'Aardappelfoto 1',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 2',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 3',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 4',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 5',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 6',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 7',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 8',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 9',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 10',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                ], [
                    {
                        answer: 'Aardappelfoto 1',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 2',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 3',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 4',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 5',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 6',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 7',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 8',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 9',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 10',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                ], [
                    {
                        answer: 'Aardappelfoto 1',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 2',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 3',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 4',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 5',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 6',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 7',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 8',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 9',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                    {
                        answer: 'Aardappelfoto 10',
                        found: false,
                        imageUrl: 'patat1.png',
                    },
                ],

            ],
        };
    }

    public correctAnswer() {
        this.state.questions[this.state.currentQuestionSeriesIndex][this.state.currentImageIndex].found = true;
        return { scoreForPlayer: 10 };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion() {
        this.state.currentQuestionSeriesIndex++;
        this.state.currentImageIndex = 0;
    }

    public nextImage() {
        this.state.currentImageIndex++;
    }
}
