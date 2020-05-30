import { RoundName } from '../RoundName';

export type CollectiefGeheugenState = {
    roundName: RoundName,
    currentQuestionIndex: number,
    questions:
    Array<{
        videoUrl: string,
        answers: Array<{
            answer: string,
            found: boolean,
            score?: number,
        }>,
    }>,
};
