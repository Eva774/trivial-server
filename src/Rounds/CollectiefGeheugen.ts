import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { CollectiefGeheugenState } from '../../../dsptw-client/src/models/Rounds/CollectiefGeheugenState';
import { LowestTimeRound } from './LowestTimeRound';
import { ViewType } from '../../../dsptw-client/src/models/ViewType';

export class CollectiefGeheugen extends LowestTimeRound {

    private state: CollectiefGeheugenState;

    constructor(players: PlayerState[], questions: any) {
        super(players);
        this.state = {
            roundName: RoundName.CollectiefGeheugen,
            currentQuestionIndex: 0,
            currentView: ViewType.Videos,
            questions: questions.map((answers: any[]) => ({
                answers: answers.map((answer: any) => ({ text: answer, found: false }))
            }))
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

    public setCurrentQuestion(questionIndex: number): void {
        this.state.currentQuestionIndex = questionIndex;
    }

    public setView(view: ViewType) {
        this.state.currentView = view;
    }

    public showAllAnswers(): void {
        this.state.questions[this.state.currentQuestionIndex].answers.forEach(answer => {
            answer.found = true;
        })
    }
}
