import { getAllNeighbors, GridCoord } from '../utils/get-all-neighbours';
import * as helpers from './helper';
import { TrailHead, TrailPoint } from './models/trail-head';

type Grid = string[][];

export const solvePart2 = (): any => {
  const grid: Grid = helpers.getGrid();
  // Implement solution logic
  const trailHeads: TrailHead[] = findAllValidTrailHeads(grid);

  return trailHeads.reduce((acc, th) => acc + th.connectedTrails.length, 0);
};

function findAllValidTrailHeads(grid: string[][]): TrailHead[] {
  const maxStepAmount: number = 1;
  let validTrailHeads: TrailHead[] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '0') {
        const trail = findAllTrails({ row: i, col: j }, grid, maxStepAmount);
        if(trail) {
          validTrailHeads.push(trail);
        }
      }
    }
  }

  return validTrailHeads;
}

function findAllTrails(trailStart: GridCoord, grid: string[][], maxStepAmount: number): TrailHead | null {
  const queue: { coord: GridCoord; path: TrailPoint[] }[] = [];
  const connectedTrails: TrailPoint[][] = [];
  queue.push({
    coord: trailStart,
    path: [{ pointHeight: parseInt(grid[trailStart.row][trailStart.col]), coord: trailStart }]
  });

  while (queue.length > 0) {
    const { coord, path } = queue.shift()!;
    const { row, col } = coord;
    const currentHeight = parseInt(grid[row][col]);

    if (currentHeight === 9) {
      connectedTrails.push(path);
      continue;
    }

    const neighbors = getAllNeighbors(grid, row, col);

    for (const neighbor of neighbors) {
      const { row: nr, col: nc } = neighbor;
      const neighborHeight = parseInt(grid[nr][nc]);

      if (
        neighborHeight > currentHeight && neighborHeight - maxStepAmount <= currentHeight &&
        !path.some(point => point.coord.row === nr && point.coord.col === nc) 
      ) {
        queue.push({
          coord: { row: nr, col: nc },
          path: [...path, { pointHeight: neighborHeight, coord: { row: nr, col: nc } }]
        });
      }
    }
  }

  if (connectedTrails.length > 0) {
    return {
      startingPosition: trailStart,
      connectedTrails
    };
  }

  return null;
}




