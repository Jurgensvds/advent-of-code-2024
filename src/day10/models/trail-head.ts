import { GridCoord } from "./grid-coord";

export interface TrailHead {
    startingPosition: GridCoord;
    connectedTrails: TrailPoint[][];
}

export interface TrailPoint {
    pointHeight: number;
    coord: GridCoord;
}