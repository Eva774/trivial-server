import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { GalerijState } from '../../../dsptw-client/src/models/Rounds/GalerijState';
import { LowestTimeRound } from './LowestTimeRound';
import { log } from '../Log';

export class Galerij extends LowestTimeRound {

    private state: GalerijState;

    constructor(players: PlayerState[], questions: any) {
        super(players);
        this.state = {
            roundName: RoundName.Galerij,
            currentImageIndex: -1,
            currentQuestionSeriesIndex: 0,
            questions: questions.map((series: any[]) =>
                series.map((answer: any) =>
                    ({ answer, found: false })
                )
            )
        };
    }

    public correctAnswer(imageIndex: number) {
        this.state.questions[this.state.currentQuestionSeriesIndex][imageIndex].found = true;
        const answersFound = this.state.questions[this.state.currentQuestionSeriesIndex].filter(answer => answer.found).length;
        const allAnswersFound = answersFound === 10;
        return { scoreForPlayer: 15, allAnswersFound };
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
