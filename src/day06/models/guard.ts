import { Direction } from "./direction";

export interface Guard {
    row: number;
    col: number;
    direction: Direction;
    totalLoopsDetected?: number;
}