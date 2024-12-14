import { getAllNeighbors, GridCoord } from '../utils/get-all-neighbours';
import * as helpers from './helper';
import { Section, Areas } from './models/areas';

export const solvePart1 = (): number => {
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
    const totalPrice = regions.reduce((acc, region) => acc + region.fences * region.coords.length, 0);
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