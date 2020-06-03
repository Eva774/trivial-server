import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { OpenDeurState } from '../../../dsptw-client/src/models/Rounds/OpenDeurState';
import { Round } from './Round';

export class OpenDeur extends Round {

    private state: OpenDeurState;

    constructor() {
        super();
        this.state = {
            roundName: RoundName.OpenDeur,
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
                    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
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
                    videoUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
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
                    videoUrl: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_640_3MG.mp4',
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
