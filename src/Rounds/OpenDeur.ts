import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { OpenDeurState } from '../../../dsptw-client/src/models/Rounds/OpenDeurState';
import { ViewType } from '../../../dsptw-client/src/models/ViewType';
import { Round } from './Round';

export class OpenDeur extends Round {

    private state: OpenDeurState;

    constructor() {
        super();
        this.state = {
            roundName: RoundName.OpenDeur,
            currentQuestionIndex: 0,
            currentView: ViewType.Videos,
            questions: [
                {
                    answers: [{
                        found: false,
                        text: 'veel mijne man1',
                    },
                    {
                        found: false,
                        text: 'veel mijne man2',
                    },
                    {
                        found: false,
                        text: 'veel mijne man3',
                    }
                        , {
                        found: false,
                        text: 'veel mijne man4',
                    }],
                    question: 'hoeveel patatten enal zeg1',
                    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
                },
                {
                    answers: [{
                        found: false,
                        text: 'veel mijne man5',
                    },
                    {
                        found: false,
                        text: 'veel mijne man6',
                    },
                    {
                        found: false,
                        text: 'veel mijne man7',
                    }
                        , {
                        found: false,
                        text: 'veel mijne man8',
                    }],
                    question: 'hoeveel patatten enal zeg2',
                    videoUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
                },
                {
                    answers: [{
                        found: false,
                        text: 'veel mijne man9',
                    },
                    {
                        found: false,
                        text: 'veel mijne man10',
                    },
                    {
                        found: false,
                        text: 'veel mijne man11',
                    }
                        , {
                        found: false,
                        text: 'veel mijne man12',
                    }],
                    question: 'hoeveel patatten enal zeg3',
                    videoUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
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

    public setCurrentQuestion(questionIndex: number): void {
        this.state.currentQuestionIndex = questionIndex;
    }

    public setView(view: ViewType) {
        this.state.currentView = view;
    }

    public nextQuestion(): void {
        this.state.currentQuestionIndex++;
    }

}
