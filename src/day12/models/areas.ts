import { GridCoord } from "../../utils/get-all-neighbours";

export interface Areas {
    [key: string]: Section[];
}

export interface Section {
    coords: GridCoord[];
    fences: number;
}