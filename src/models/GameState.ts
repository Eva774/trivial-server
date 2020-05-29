import { PlayerState } from './PlayerState';
import { RoundState } from './Rounds/RoundState';

export type GameState = {
    currentPlayer: number,
    roundState: RoundState,
    players: PlayerState[],
    timerIsRunning: boolean,
};
