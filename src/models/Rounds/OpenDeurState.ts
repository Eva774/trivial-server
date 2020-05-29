export type OpenDeurState = {
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
