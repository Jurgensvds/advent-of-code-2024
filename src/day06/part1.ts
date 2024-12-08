import * as helpers from './helper';
import { Direction } from './models/direction';
import { Guard } from './models/guard';

export const solvePart1 = (): any => {
  const grid: string[][] = helpers.getGrid();
  const guard = helpers.findGuardOnGrid(grid);
  if (!guard) {
    throw new Error('Guard not found');
  }
  
  moveGuardAndMarkSteps(grid, guard);
  const TwoDGridAsString = grid.map((row) => row.join('')).join('\n');
  const regexAllXs = /X/g;
  const matches = TwoDGridAsString.match(regexAllXs);
  
  return matches?.length;
};

function moveGuardAndMarkSteps(grid: string[][], guard: Guard): void {
  while(helpers.isGuardOnGrid(guard, grid)) {
    const nextPosition = helpers.getNextPosition(guard);
    if (!helpers.isGuardOnGrid(nextPosition, grid) || grid[nextPosition.row][nextPosition.col] === '.' || (grid[nextPosition.row][nextPosition.col] === 'X' && grid[guard.row][guard.col] === '.')) {
      grid[guard.row][guard.col] = 'X';
      guard.row = nextPosition.row;
      guard.col = nextPosition.col;
    } else if (grid[nextPosition.row][nextPosition.col] === '#') {
      guard.direction = helpers.getNextDirection(guard.direction);
    } else {
      guard.row = nextPosition.row;
      guard.col = nextPosition.col;
    }
  }
}

