import { readInput } from '../utils/file-reader';
import { get2DGrid } from '../utils/get-2d-grid';
import { Direction } from './models/direction';
import { Guard } from './models/guard';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('06');
};

export const getGrid = (): string[][] => {
  return get2DGrid(getInput());
}

export const findGuardOnGrid = (grid: string[][]): Guard | null => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if (cell === '^') {
        return { row, col, direction: Direction.Up };
      } else if (cell === 'v') {
        return { row, col, direction: Direction.Down };
      } else if (cell === '<') {
        return { row, col, direction: Direction.Left };
      } else if (cell === '>') {
        return { row, col, direction: Direction.Right };
      }
    }
  }

  return null;
}

export const getNextPosition = (guard: Guard): Guard => {
  switch (guard.direction) {
    case Direction.Up:
      return { row: guard.row - 1, col: guard.col, direction: guard.direction };
    case Direction.Down:
      return { row: guard.row + 1, col: guard.col, direction: guard.direction };
    case Direction.Left:
      return { row: guard.row, col: guard.col - 1, direction: guard.direction };
    case Direction.Right:
      return { row: guard.row, col: guard.col + 1, direction: guard.direction };
  }
}

export const getNextDirection = (direction: Direction): Direction => {
  switch (direction) {
  case Direction.Up:
    return Direction.Right;
  case Direction.Down:
    return Direction.Left;
  case Direction.Left:
    return Direction.Up;
  case Direction.Right:
    return Direction.Down;
  }
}


export const isGuardOnGrid = (guard: Guard, grid: string[][]): boolean => {
  return guard.row >= 0 && guard.row < grid.length && guard.col >= 0 && guard.col < grid[guard.row].length;
}

export const getRightPerpendicularDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.Up:
      return Direction.Right;
    case Direction.Down:
      return Direction.Left;
    case Direction.Left:
      return Direction.Up;
    case Direction.Right:
      return Direction.Down;
  }
}
