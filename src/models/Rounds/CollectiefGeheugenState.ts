export type CollectiefGeheugenState = {
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
