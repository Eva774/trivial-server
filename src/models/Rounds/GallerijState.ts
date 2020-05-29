export type GallerijState = {
    currentImageIndex: number,
    currentQuestionSeriesIndex: number,
    questions: Array<Array<{
        imageUrl: string,
        answer: string,
        found: boolean,
    }>>,
};
