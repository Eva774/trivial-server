import { RoundName } from '../models/RoundName';
import { OpenDeurState } from '../models/Rounds/OpenDeurState';
import { Round } from './Round';

export class OpenDeur extends Round {

    private state: OpenDeurState;

    constructor() {
        super(RoundName.OpenDeur);
        this.state = {
            currentQuestionIndex: 0,
            questions: [
                {
                    answers: [{
                        found: false,
                        text: 'veel mijne man',
                    },
                    {
                        found: false,
                        text: 'veel mijne man',
                    },
                    {
                        found: false,
                        text: 'veel mijne man',
                    }
                        , {
                        found: false,
                        text: 'veel mijne man',
                    }],
                    question: 'hoeveel patatten enal zeg1',
                    videoUrl: 'patatvideo.mp4',
                },
                {
                    answers: [{
                        found: false,
                        text: 'veel mijne man',
                    },
                    {
                        found: false,
                        text: 'veel mijne man',
                    },
                    {
                        found: false,
                        text: 'veel mijne man',
                    }
                        , {
                        found: false,
                        text: 'veel mijne man',
                    }],
                    question: 'hoeveel patatten enal zeg1',
                    videoUrl: 'patatvideo.mp4',
                },
                {
                    answers: [{
                        found: false,
                        text: 'veel mijne man',
                    },
                    {
                        found: false,
                        text: 'veel mijne man',
                    },
                    {
                        found: false,
                        text: 'veel mijne man',
                    }
                        , {
                        found: false,
                        text: 'veel mijne man',
                    }],
                    question: 'hoeveel patatten enal zeg1',
                    videoUrl: 'patatvideo.mp4',
                },
            ],
        };
    }

    public correctAnswer(foundIndex: number) {
        this.state.questions[this.state.currentQuestionIndex].answers[foundIndex].found = true;
        return { scoreForPlayer: 20 };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion(): void {
        this.state.currentQuestionIndex++;
    }

}
