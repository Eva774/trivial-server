export type FinaleState = {
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
