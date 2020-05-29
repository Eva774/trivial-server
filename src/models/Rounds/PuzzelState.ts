export type PuzzelState = {
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
