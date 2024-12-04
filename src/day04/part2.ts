import * as helpers from './helper';

export const solvePart2 = (): any => {
  const xmasGrid = helpers.getGrid();
  let xmasCount = 0;
  for (let i = 1; i < xmasGrid.length - 1; i++) {
    for (let j = 1; j < xmasGrid[i].length - 1; j++) {
      if (xmasGrid[i][j] === 'A') {
        xmasCount += isXmas(xmasGrid, i, j) ? 1 : 0;
      }
    }
  }

  return xmasCount;
};

function isXmas(grid: string[][], row: number, col: number): boolean {
  const lineOne: boolean =
    (grid[row - 1][col - 1] === 'M' && grid[row + 1][col + 1] === 'S') ||
    (grid[row - 1][col - 1] === 'S' && grid[row + 1][col + 1] === 'M');
  const lineTwo: boolean =
    (grid[row - 1][col + 1] === 'M' && grid[row + 1][col - 1] === 'S') ||
    (grid[row - 1][col + 1] === 'S' && grid[row + 1][col - 1] === 'M');
  if (lineOne && lineTwo) {
    return true;
  }

  return false;
}
