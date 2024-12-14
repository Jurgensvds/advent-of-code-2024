import { GridCoord } from "../../utils/get-all-neighbours";

export interface TrailHead {
    startingPosition: GridCoord;
    connectedTrails: TrailPoint[][];
}

export interface TrailPoint {
    pointHeight: number;
    coord: GridCoord;
}