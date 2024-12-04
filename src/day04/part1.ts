import * as helpers from './helper';

enum Direction {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
  UP_LEFT = 'UL',
  UP_RIGHT = 'UR',
  DOWN_LEFT = 'DL',
  DOWN_RIGHT = 'DR',
  NONE = 'N',
}

const lookupMap: { [key: string]: string | null } = {
  X: 'M',
  M: 'A',
  A: 'S',
  S: 'DONE',
};

interface LetterAndCoordinate {
  letter: 'X' | 'M' | 'A' | 'S';
  direction: Direction;
  row: number;
  col: number;
}

export const solvePart1 = (): any => {
  const xmasGrid = helpers.getGrid();
  let xmasCount = 0;
  for (let i = 0; i < xmasGrid.length; i++) {
    for (let j = 0; j < xmasGrid[i].length; j++) {
      if (xmasGrid[i][j] === 'X') {
        xmasCount += hasXmasWord(xmasGrid, i, j, 'X');
      }
    }
  }

  return xmasCount;
};

function hasXmasWord(
  grid: string[][],
  row: number,
  col: number,
  currentLetter: 'X' | 'M' | 'A' | 'S',
  totalMatches: number = 0,
  direction: Direction = Direction.NONE,
): number {
  if (lookupMap[currentLetter] === 'DONE') {
    return 1;
  }

  const neighbors: LetterAndCoordinate[] = getAllNeighbors(grid, row, col);

  const allMatchingNeighbors = neighbors.filter(
    (neighbor) =>
      neighbor.letter === lookupMap[currentLetter] &&
      (direction === Direction.NONE || neighbor.direction === direction),
  );

  if (allMatchingNeighbors.length === 0) {
    return 0;
  }

  for (const neighbor of allMatchingNeighbors) {
    totalMatches += hasXmasWord(
      grid,
      neighbor.row,
      neighbor.col,
      lookupMap[currentLetter] as 'X' | 'M' | 'A' | 'S',
      0,
      neighbor.direction,
    );
  }

  return totalMatches;
}

function getAllNeighbors(
  grid: string[][],
  row: number,
  col: number,
): LetterAndCoordinate[] {
  const directions = [
    { rowOffset: -1, colOffset: -1, direction: Direction.UP_LEFT },
    { rowOffset: -1, colOffset: 0, direction: Direction.UP },
    { rowOffset: -1, colOffset: 1, direction: Direction.UP_RIGHT },
    { rowOffset: 0, colOffset: -1, direction: Direction.LEFT },
    { rowOffset: 0, colOffset: 1, direction: Direction.RIGHT },
    { rowOffset: 1, colOffset: -1, direction: Direction.DOWN_LEFT },
    { rowOffset: 1, colOffset: 0, direction: Direction.DOWN },
    { rowOffset: 1, colOffset: 1, direction: Direction.DOWN_RIGHT },
  ];

  return directions
    .map(({ rowOffset, colOffset, direction }) => ({
      letter: grid[row + rowOffset]?.[col + colOffset] as 'X' | 'M' | 'A' | 'S',
      row: row + rowOffset,
      col: col + colOffset,
      direction,
    }))
    .filter(
      ({ letter, row, col }) =>
        letter !== undefined &&
        row >= 0 &&
        col >= 0 &&
        row < grid.length &&
        col < grid[0].length,
    );
}
