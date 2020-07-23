import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { PuzzelState } from '../../../dsptw-client/src/models/Rounds/PuzzelState';
import { LowestTimeRound } from './LowestTimeRound';
import shuffleSeed from 'shuffle-seed';

export class Puzzel extends LowestTimeRound {

    private state: PuzzelState;

    constructor(players: PlayerState[], puzzles: any) {
        super(players);

        const allPuzzles = puzzles.map((puzzle: any) => {
            const answers = puzzle.map((group: { answer: any; }) => ({
                text: group.answer,
                found: false
            }));
            let grid: { text: any; answerIndex: any; }[] = [];
            puzzle.forEach((group: { words: any[]; }, answerIndex: any) => {
                group.words.forEach(word => {
                    grid.push({
                        text: word,
                        answerIndex
                    })
                })
            })
            return {
                grid: shuffleSeed.shuffle(grid, grid[0].text),
                answers
            }
        })

        this.state = {
            roundName: RoundName.Puzzel,
            currentPuzzleIndex: 0,
            puzzles: allPuzzles
        };
    }

    public correctAnswer(foundIndex: number) {

        this.state.puzzles[this.state.currentPuzzleIndex].answers[foundIndex].found = true;
        return { scoreForPlayer: 30 };
    }

    public getState() {
        return this.state;
    }

    public nextQuestion(): void {
        if (this.state.currentPuzzleIndex < 2) {
            this.state.currentPuzzleIndex++;
        }
    }

    public showAllAnswers(): void {
        this.state.puzzles[this.state.currentPuzzleIndex].answers.forEach(answer => {
            answer.found = true;
        })
    }

}
