export type CollectiefGeheugenState = {
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
