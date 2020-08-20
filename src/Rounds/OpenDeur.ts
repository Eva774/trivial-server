import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { OpenDeurState } from '../../../dsptw-client/src/models/Rounds/OpenDeurState';
import { ViewType } from '../../../dsptw-client/src/models/ViewType';
import { LowestTimeRound } from './LowestTimeRound';

export class OpenDeur extends LowestTimeRound {

    private state: OpenDeurState;

    constructor(players: PlayerState[], questions: any) {
        super(players);
        this.state = {
            roundName: RoundName.OpenDeur,
            currentQuestionIndex: 0,
            currentView: ViewType.Videos,
            questions: questions.map((question: any) =>
                ({
                    question: question.question,
                    answers: question.answers.map((answer: any) => ({ text: answer, found: false }))
                }))
        };
    }

    public correctAnswer(foundIndex: number) {
        this.state.questions[this.state.currentQuestionIndex].answers[foundIndex].found = true;
        const answersFound = this.state.questions[this.state.currentQuestionIndex].answers.filter(answer => answer.found).length;
        const allAnswersFound = answersFound === 4;
        return { scoreForPlayer: 20, allAnswersFound };
    }

    public getState() {
        return this.state;
    }

    public setCurrentQuestion(questionIndex: number): void {
        this.state.currentQuestionIndex = questionIndex;
    }

    public setView(view: ViewType) {
        this.state.currentView = view;
    }

    public nextQuestion(): void {
        this.state.currentQuestionIndex++;
    }

    public showAllAnswers(): void {
        this.state.questions[this.state.currentQuestionIndex].answers.forEach(answer => {
            answer.found = true;
        })
    }

}
