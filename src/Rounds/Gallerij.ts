import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { GallerijState } from '../../../dsptw-client/src/models/Rounds/GallerijState';
import { LowestTimeRound } from './LowestTimeRound';
import { log } from '../Log';

export class Gallerij extends LowestTimeRound {

    private state: GallerijState;

    constructor(players: PlayerState[]) {
        super(players);
        this.state = {
            roundName: RoundName.Gallerij,
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
                        imageUrl: 'patat2.png',
                    },
                    {
                        answer: 'Aardappelfoto 3',
                        found: false,
                        imageUrl: 'patat3.png',
                    },
                    {
                        answer: 'Aardappelfoto 4',
                        found: false,
                        imageUrl: 'patat4.png',
                    },
                    {
                        answer: 'Aardappelfoto 5',
                        found: false,
                        imageUrl: 'patat5.png',
                    },
                    {
                        answer: 'Aardappelfoto 6',
                        found: false,
                        imageUrl: 'patat6.png',
                    },
                    {
                        answer: 'Aardappelfoto 7',
                        found: false,
                        imageUrl: 'patat7.png',
                    },
                    {
                        answer: 'Aardappelfoto 8',
                        found: false,
                        imageUrl: 'patat8.png',
                    },
                    {
                        answer: 'Aardappelfoto 9',
                        found: false,
                        imageUrl: 'patat9.png',
                    },
                    {
                        answer: 'Aardappelfoto 10',
                        found: false,
                        imageUrl: 'patat10.png',
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
        if (this.state.currentQuestionSeriesIndex < 2) {
            this.state.currentQuestionSeriesIndex++;
            this.state.currentImageIndex = 0;
        }
    }

    public nextImage() {
        if (this.state.currentImageIndex < 9) {
            this.state.currentImageIndex++;
        }
    }

    public showAllAnswers(): void {
        log.error('Cannot show all answers on round DrieZesNegen');
    }
}
