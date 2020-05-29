export type OpenDeurState = {
    questions:
    [{
        videoUrl: string,
        question: string,
        answers: [{
            text: string,
            found: boolean,
        }],
    }],
};
