import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { GallerijState } from '../../../dsptw-client/src/models/Rounds/GallerijState';
import { LowestTimeRound } from './LowestTimeRound';
import { log } from '../Log';

export class Gallerij extends LowestTimeRound {

    private state: GallerijState;

    constructor(players: PlayerState[], questions: any) {
        super(players);
        this.state = {
            roundName: RoundName.Gallerij,
            currentImageIndex: -1,
            currentQuestionSeriesIndex: 0,
            questions
        };
    }

    public correctAnswer(imageIndex: number) {
        this.state.questions[this.state.currentQuestionSeriesIndex][imageIndex].found = true;
        return { scoreForPlayer: 10 };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion() {
        if (this.state.currentQuestionSeriesIndex < 2) {
            this.state.currentQuestionSeriesIndex++;
            this.state.currentImageIndex = -1;
        }
    }

    public nextImage() {
        if (this.state.currentImageIndex < 9) {
            this.state.currentImageIndex++;
        } else {
            this.state.currentImageIndex = -1;
        }
    }

    public showAllAnswers(): void {
        log.error('Cannot show all answers on round DrieZesNegen');
    }
}
