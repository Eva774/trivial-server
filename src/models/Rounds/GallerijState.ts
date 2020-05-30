import { RoundName } from '../RoundName';

export type GallerijState = {
    roundName: RoundName,
    currentImageIndex: number,
    currentQuestionSeriesIndex: number,
    questions: Array<Array<{
        imageUrl: string,
        answer: string,
        found: boolean,
    }>>,
};
