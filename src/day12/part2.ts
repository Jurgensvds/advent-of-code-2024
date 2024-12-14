import { GridCoord, getAllNeighbors } from '../utils/get-all-neighbours';
import * as helpers from './helper';
import { Areas, Section } from './models/areas';
import { StraightLines } from './models/straight-lines';

export const solvePart2 = (): any => {
  const grid = helpers.getGrid();
  const visited = new Set<string>();
  const areas: Areas = {};

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (!visited.has(`${r}-${c}`)) {
        const region = findRegion(grid, { row: r, col: c }, visited);
        const plantType = grid[r][c];

        if (!areas[plantType]) {
          areas[plantType] = [];
        }
        areas[plantType].push(region);
      }
    }
  }

  return Object.keys(areas).reduce((acc, plantType) => {
    const regions = areas[plantType];
    const totalPrice = regions.reduce((acc, region) => acc + countStraightLine(region.coords, region.coords.map((coord) => `${coord.row}-${coord.col}`)) * region.coords.length, 0);
    return acc + totalPrice;
  }, 0);
};

function findRegion(grid: string[][], startCoord: GridCoord, visited: Set<string>): Section {
  const plantType = grid[startCoord.row][startCoord.col];
  const stack: GridCoord[] = [startCoord];

  const regionCoords: GridCoord[] = [];

  while (stack.length > 0) {
    const coord = stack.pop() as GridCoord;
    const { row, col } = coord;
    const key = `${row}-${col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (grid[row][col] !== plantType) continue;

    regionCoords.push(coord);

    const neighbors = getAllNeighbors(grid, row, col);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(neighborKey) && grid[neighbor.row][neighbor.col] === plantType) {
        stack.push(neighbor);
      }
    }
  }

  const fences = calculateFences(grid, regionCoords);

  return { coords: regionCoords, fences };
}

function calculateFences(grid: string[][], coords: GridCoord[]): number {
  const plantType = grid[coords[0].row][coords[0].col];
  let fences = 0;

  for (const coord of coords) {
    const { row, col } = coord;
    const neighbors = getAllNeighbors(grid, row, col);

    const differentNeighbors = neighbors.filter((n) => grid[n.row][n.col] !== plantType).length;
    fences += differentNeighbors;

    if (row === 0 || row === grid.length - 1) fences++;
    if (col === 0 || col === grid[0].length - 1) fences++;
  }

  return fences;
}

function countStraightLine(coords: GridCoord[], stringCoords: string[]): number {
  const straightLines: StraightLines = {
    top: {},
    bottom: {},
    left: {},
    right: {}
  };

  for (let coord of coords) {
    if (!stringCoords.includes(`${coord.row-1}-${coord.col}`)) {
      if(!straightLines.top[`${coord.row}`]) {
        straightLines.top[`${coord.row}`] = [];
      }
      straightLines.top[`${coord.row}`].push(coord.col);
    }
    if (!stringCoords.includes(`${coord.row+1}-${coord.col}`)) {
      if(!straightLines.bottom[`${coord.row}`]) {
        straightLines.bottom[`${coord.row}`] = [];
      }
      straightLines.bottom[`${coord.row}`].push(coord.col);
    }
    if (!stringCoords.includes(`${coord.row}-${coord.col-1}`)) {
      if(!straightLines.left[`${coord.col}`]) {
        straightLines.left[`${coord.col}`] = [];
      }
      straightLines.left[`${coord.col}`].push(coord.row);
    }
    if (!stringCoords.includes(`${coord.row}-${coord.col+1}`)) {
      if(!straightLines.right[`${coord.col}`]) {
        straightLines.right[`${coord.col}`] = [];
      }
      straightLines.right[`${coord.col}`].push(coord.row);
    }
  }

  return countStraightLines(sortAllStraightLines(straightLines));
}

function sortAllStraightLines(straightLines: StraightLines): StraightLines {
  const sortedStraightLines: StraightLines = {
    top: {},
    bottom: {},
    left: {},
    right: {}
  };

  for (let key in straightLines.top) {
    sortedStraightLines.top[key] = straightLines.top[key].sort((a, b) => a - b);
  }

  for (let key in straightLines.bottom) {
    sortedStraightLines.bottom[key] = straightLines.bottom[key].sort((a, b) => a - b);
  }

  for (let key in straightLines.left) {
    sortedStraightLines.left[key] = straightLines.left[key].sort((a, b) => a - b);
  }

  for (let key in straightLines.right) {
    sortedStraightLines.right[key] = straightLines.right[key].sort((a, b) => a - b);
  }

  return sortedStraightLines;
}

function countStraightLines(straightLines: StraightLines): number {
  let count = 0;

  for (let key in straightLines.top) {
    count += countLine(straightLines.top[key]);
  }

  for (let key in straightLines.bottom) {
    count += countLine(straightLines.bottom[key]);
  }

  for (let key in straightLines.left) {
    count += countLine(straightLines.left[key]);
  }

  for (let key in straightLines.right) {
    count += countLine(straightLines.right[key]);
  }

  return count;
}

function countLine(line: number[]): number {
  let count = 1;
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i] + 1 !== line[i + 1]) {
      count++;
    }
  }

  return count;
}
