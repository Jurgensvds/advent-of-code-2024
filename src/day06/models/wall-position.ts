import { Direction } from "./direction";

export interface GridPosition {
    row: number;
    col: number;
    accessDirection?: Direction
}