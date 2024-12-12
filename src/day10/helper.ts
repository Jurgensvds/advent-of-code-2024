import { readInput } from '../utils/file-reader';
import { get2DGrid } from '../utils/get-2d-grid';
import { GridCoord } from './models/grid-coord';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('10');
};

export const getGrid = (): string[][] => {
  return get2DGrid(getInput());
}

export const getAllNeighbors = (grid: string[][], row: number, col: number): GridCoord[] => {
  const neighbors: GridCoord[] = [];
  if (row > 0) {
    neighbors.push({ row: row - 1, col });
  }
  if (row < grid.length - 1) {
    neighbors.push({ row: row + 1, col });
  }
  if (col > 0) {
    neighbors.push({ row, col: col - 1 });
  }
  if (col < grid[0].length - 1) {
    neighbors.push({ row, col: col + 1 });
  }
  return neighbors;
};

