import { RoundName } from '../RoundName';

export type OpenDeurState = {
    roundName: RoundName,
    questions:
    Array<{
        videoUrl: string,
        question: string,
        answers: Array<{
            text: string,
            found: boolean,
        }>,
    }>,
    currentQuestionIndex: number,
};
