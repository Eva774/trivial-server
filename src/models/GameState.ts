import { PlayerState } from './PlayerState';
import { CollectiefGeheugenState } from './Rounds/CollectiefGeheugenState';
import { DrieZesNegenState } from './Rounds/DrieZesNegenState';
import { FinaleState } from './Rounds/FinaleState';
import { GallerijState } from './Rounds/GallerijState';
import { OpenDeurState } from './Rounds/OpenDeurState';
import { PuzzelState } from './Rounds/PuzzelState';

export type GameState = {
    currentPlayer: number,
    roundState: DrieZesNegenState | OpenDeurState | PuzzelState | GallerijState | CollectiefGeheugenState | FinaleState,
    players: PlayerState[],
    timerIsRunning: boolean,
};
