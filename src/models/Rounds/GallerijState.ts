export type GallerijState = {
    questions:
    [{
        questions: Array<{
            imageUrl: string,
            answer: string,
            found: boolean,
        }>,
    }],
};
