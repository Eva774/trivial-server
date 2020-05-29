export type FinaleState = {
    questions:
    [{
        question: string,
        answers: [{
            text: string,
            found: boolean,
        }],
    }],
};
