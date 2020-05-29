import { CollectiefGeheugenState } from './CollectiefGeheugenState';
import { DrieZesNegenState } from './DrieZesNegenState';
import { FinaleState } from './FinaleState';
import { GallerijState } from './GallerijState';
import { OpenDeurState } from './OpenDeurState';
import { PuzzelState } from './PuzzelState';

export type RoundState = DrieZesNegenState
    | OpenDeurState
    | PuzzelState
    | GallerijState
    | CollectiefGeheugenState
    | FinaleState;
