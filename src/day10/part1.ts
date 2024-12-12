import * as helpers from './helper';
import { GridCoord } from './models/grid-coord';
import { TrailHead, TrailPoint } from './models/trail-head';

type Grid = string[][];

export const solvePart1 = (): any => {
  const grid = helpers.getGrid();
  // Implement solution logic

  const trailHeads: number = sumTrailheadScores(grid);

  return trailHeads;
};

export function sumTrailheadScores(grid: Grid): number {
    const trailHeads = findAllTrailHeads(grid);

    const completedTrailHeads = trailHeads.map(thCoord => buildTrailHeadWithTrails(grid, thCoord));

    return calculateTotalScore(completedTrailHeads);
}

function findAllTrailHeads(grid: Grid): GridCoord[] {
    const trailHeadCoords: GridCoord[] = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '0') {
                trailHeadCoords.push({ row, col });
            }
        }
    }
    return trailHeadCoords;
}

function findAllTrailsFromTrailHead(grid: Grid, start: GridCoord): TrailPoint[][] {
    const rows = grid.length;
    const cols = grid[0].length;

    const visited = createVisitedMatrix(rows, cols);
    visited[start.row][start.col] = true;

    const initialTrail: TrailPoint = {
        pointHeight: 0,
        coord: { row: start.row, col: start.col }
    };
    const queue: TrailPoint[][] = [[initialTrail]];

    const completeTrails: TrailPoint[][] = [];

    while (queue.length > 0) {
        const currentPath = queue.shift()!;
        const currentPoint = currentPath[currentPath.length - 1];
        const currentHeight = currentPoint.pointHeight;

        if (currentHeight === 9) {
            completeTrails.push(currentPath);
            continue;
        }

        const nextHeight = currentHeight + 1;
        const nextHeightChar = nextHeight.toString();

        for (const neighbor of helpers.getAllNeighbors( grid, currentPoint.coord.row, currentPoint.coord.col)) {
            if (grid[neighbor.row][neighbor.col] === nextHeightChar && !visited[neighbor.row][neighbor.col]) {
                visited[neighbor.row][neighbor.col] = true;
                const newPoint: TrailPoint = {
                    pointHeight: nextHeight,
                    coord: { row: neighbor.row, col: neighbor.col }
                };
                queue.push([...currentPath, newPoint]);
            }
        }
    }

    return completeTrails;
}

function buildTrailHeadWithTrails(grid: Grid, trailHeadCoord: GridCoord): TrailHead {
    const trails = findAllTrailsFromTrailHead(grid, trailHeadCoord);

    return {
        startingPosition: trailHeadCoord,
        connectedTrails: trails
    };
}

function calculateTotalScore(trailHeads: TrailHead[]): number {
    let totalScore = 0;

    for (const th of trailHeads) {
        const nineEndpoints = new Set<string>();
        for (const trail of th.connectedTrails) {
            const endPoint = trail[trail.length - 1];
            if (endPoint.pointHeight === 9) {
                nineEndpoints.add(`${endPoint.coord.row},${endPoint.coord.col}`);
            }
        }
        const score = nineEndpoints.size;
        totalScore += score;
    }

    return totalScore;
}

function createVisitedMatrix(rows: number, cols: number): boolean[][] {
    return Array.from({ length: rows }, () => Array(cols).fill(false));
}
