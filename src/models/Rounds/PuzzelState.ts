export type PuzzelState = {
    questions:
    [{
        questions: [{
            grid: [{
                text: string,
                answerIndex: number,
            }]
            answers: {
                text: string,
                found: boolean,
            },
        }],
    }],
};
