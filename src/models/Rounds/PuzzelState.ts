import { RoundName } from '../RoundName';

export type PuzzelState = {
    roundName: RoundName,
    currentPuzzleIndex: number,
    puzzles:
    Array<{
        grid: Array<{
            text: string,
            answerIndex: number,
        }>,
        answers: Array<{
            text: string,
            found: boolean,
        }>,
    }>,
};
