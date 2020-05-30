import { RoundName } from '../RoundName';

export type DrieZesNegenState = {
    roundName: RoundName,
    questions:
    Array<{
        question: string,
        answer: string,
    }>,
    currentQuestionIndex: number,
};
