import { RoundName } from '../RoundName';

export type FinaleState = {
    roundName: RoundName,
    currentQuestionIndex: number,
    questions:
    Array<{
        question: string,
        answers: Array<{
            text: string,
            found: boolean,
        }>,
    }>,
};
