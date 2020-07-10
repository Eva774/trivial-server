import { PlayerState } from '../../../dsptw-client/src/models/PlayerState';
import { RoundName } from '../../../dsptw-client/src/models/RoundName';
import { PuzzelState } from '../../../dsptw-client/src/models/Rounds/PuzzelState';
import { LowestTimeRound } from './LowestTimeRound';

export class Puzzel extends LowestTimeRound {

    private state: PuzzelState;

    constructor(players: PlayerState[], puzzles: any) {
        super(players);
        this.state = {
            roundName: RoundName.Puzzel,
            currentPuzzleIndex: 0,
            puzzles
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
        this.state.currentPuzzleIndex++;
    }

    public showAllAnswers(): void {
        this.state.puzzles[this.state.currentPuzzleIndex].answers.forEach(answer => {
            answer.found = true;
        })
    }

}
