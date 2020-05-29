export type CollectiefGeheugenState = {
    questions:
    [{
        videoUrl: string,
        answers: [{
            answer: string,
            found: boolean,
            score?: number,
        }],
    }],
};
