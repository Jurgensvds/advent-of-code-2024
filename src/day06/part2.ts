import * as helpers from './helper';

export const solvePart2 = (): any => {
  const grid: string[][] = helpers.getGrid();
  const guard = {...helpers.findGuardOnGrid(grid)!, totalLoopsDetected: 0};
  if (!guard) {
    throw new Error('Guard not found');
  }

  return findLoopsInField(grid);
};

const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
];

function turnRight(dir: number): number {
    dir += 1;
    if (dir === 4) dir = 0;
    return dir;
}

function posIsObstacle(grid: string[][], pos: [number, number]): boolean {
    return grid[pos[1]][pos[0]] === '#';
}

function posIsStart(grid: string[][], pos: [number, number]): boolean {
    return grid[pos[1]][pos[0]] === '^';
}

function checkOutOfBounds(grid: string[][], pos: [number, number]): boolean {
    return pos[0] < 0 || pos[0] >= grid[0].length || pos[1] < 0 || pos[1] >= grid.length;
}

function getNext(pos: [number, number], dir: number): [number, number] {
    return [pos[0] + directions[dir][0], pos[1] + directions[dir][1]];
}

function checkForLoop(grid: string[][], pos: [number, number], dir: number, obstaclePos: [number, number]): boolean | Record<string, number[]> {
    const trace: Record<string, number[]> = {};
    while (true) {
        const nextPos = getNext(pos, dir);
        if (checkOutOfBounds(grid, nextPos)) {
            return false;
        }
        if (posIsObstacle(grid, nextPos) || (nextPos[0] === obstaclePos[0] && nextPos[1] === obstaclePos[1])) {
            dir = turnRight(dir);
            continue;
        }
        const key = `${nextPos[0]},${nextPos[1]}`;
        if (trace[key] && trace[key].includes(dir)) {
            return trace;
        }

        pos = nextPos;
        if (trace[key]) {
            trace[key].push(dir);
        } else {
            trace[key] = [dir];
        }
    }
}

function findLoopsInField(grid: string[][]): number {
    let mainDir = 0;
    const result: Record<string, boolean> = {};
    const visited: Record<string, boolean> = {};
    let pos: [number, number] = [-1, -1];

    for (const [rowIndex, row] of grid.entries()) {
        if (pos[0] > -1) break;
        const gStart = row.indexOf('^');
        if (gStart !== -1) {
            pos = [gStart, rowIndex];
        }
    }

    while (true) {
        const nextPos = getNext(pos, mainDir);
        if (checkOutOfBounds(grid, nextPos)) {
            break;
        }
        if (posIsObstacle(grid, nextPos)) {
            mainDir = turnRight(mainDir);
            continue;
        }

        const obstacle = nextPos;
        const key = `${obstacle[0]},${obstacle[1]}`;
        if (!result[key] && !posIsStart(grid, obstacle) && !visited[key]) {
            const foundLoop = checkForLoop(grid, pos, turnRight(mainDir), obstacle);
            if (foundLoop) {
                result[key] = true;
            }
        }
        pos = nextPos;
        visited[`${pos[0]},${pos[1]}`] = true;
    }
   return Object.keys(result).length;
}

/**
 * Want to come back to the code below, but it's not working as expected
 * Feels like it was close to working, but I was missing something
 */

// export const solvePart2 = (): any => {
//   const grid: string[][] = helpers.getGrid();
//   const guard = {...helpers.findGuardOnGrid(grid)!, totalLoopsDetected: 0};
//   if (!guard) {
//     throw new Error('Guard not found');
//   }

//   moveGuardAndDetectLoops(grid, guard);

//   return guard.totalLoopsDetected;
// };

// function moveGuardAndDetectLoops(grid: string[][], guard: Guard): void {
//   const allLoops: string[][] = [];
//   while(helpers.isGuardOnGrid(guard, grid)) {
//     const nextPosition = helpers.getNextPosition(guard);
//     if(nextPosition.row < 0 || nextPosition.row >= grid.length || nextPosition.col < 0 || nextPosition.col >= grid[nextPosition.row].length) {
//       break;
//     } else if(grid[nextPosition.row][nextPosition.col] === '#') {
//       guard.direction = helpers.getNextDirection(guard.direction);
//       continue;
//     } else {
//       const tempGrid = grid.map((row) => row.map((cell) => cell));
//       const tempGuard: Guard = { ...guard };
//       tempGrid[nextPosition.row][nextPosition.col] = '#';
//       const loopExists = doesLoopExist(tempGuard, tempGrid, [{row: nextPosition.row, col: nextPosition.col, accessDirection: getOppositeDirection(guard.direction)}], allLoops);
//       if(loopExists) {
//         guard.totalLoopsDetected!++;
//       }
//       guard.row = nextPosition.row;
//       guard.col = nextPosition.col;
//     }
//   }
// }

// function doesLoopExist(guard: Guard, grid: string[][], walls: GridPosition[], allLoops: string[][]): boolean {
//   while(true) {
//     const rightPerpendicularDirection = helpers.getRightPerpendicularDirection(guard.direction);
//     const rightPerpendicularWall = getFirstWallInPerpendicularDirection(guard, grid, rightPerpendicularDirection);
//     if (!rightPerpendicularWall) return false;
//     if (walls.some((position, index) => walls.findIndex(p => p.row === position.row && p.col === position.col && p.accessDirection === position.accessDirection) !== index)) {
//       formatLoop(walls);
//       const loop = walls.map((wall) => `${wall.row}${wall.col}${wall.accessDirection}`);
//       if (loopAlreadyExists(allLoops, loop)) {
//         return false;
//       } else {
//         allLoops.push(loop);
//         return true;
//       }
//     }

//     guard.direction = rightPerpendicularDirection;
//     walls.push({...rightPerpendicularWall, accessDirection: getOppositeDirection(guard.direction)});

//     if (guard.direction === Direction.Up) {
//       guard.row = rightPerpendicularWall.row + 1;
//     } else if (guard.direction === Direction.Down) {
//       guard.row = rightPerpendicularWall.row - 1;
//     } else if (guard.direction === Direction.Left) {
//       guard.col = rightPerpendicularWall.col + 1;
//     } else {
//       guard.col = rightPerpendicularWall.col - 1;
//     }
//   }
// }

// function getFirstWallInPerpendicularDirection(guard: Guard, grid: string[][], rPDirection: Direction): GridPosition | null {
//   if (rPDirection === Direction.Up || rPDirection === Direction.Down) {
//     for (let i = guard.row; rPDirection === Direction.Up ? i >= 0 : i < grid.length; rPDirection === Direction.Up ? i-- : i++) {
//       if (grid[i][guard.col] === '#') return { row: i, col: guard.col, accessDirection: getOppositeDirection(guard.direction) };
//     }
//   } else {
//     for (let i = guard.col; rPDirection === Direction.Left ? i >= 0 : i < grid[guard.row].length; rPDirection === Direction.Left ? i-- : i++) {
//       if (grid[guard.row][i] === '#') return { row: guard.row, col: i, accessDirection: getOppositeDirection(guard.direction) };
//     }
//   }

//   return null;
// }

// function getOppositeDirection(direction: Direction): Direction {
//   switch (direction) {
//     case Direction.Up:
//       return Direction.Down;
//     case Direction.Down:
//       return Direction.Up;
//     case Direction.Left:
//       return Direction.Right;
//     case Direction.Right:
//       return Direction.Left;
//   }
// }

// function loopAlreadyExists(allLoops: string[][], loop: string[]): boolean {
// return allLoops.some(existingLoop => 
//   existingLoop.length === loop.length && 
//   existingLoop.every((value) => loop.includes(value))
// );
// }

// function formatLoop(walls: GridPosition[]): void {
//   const lastWall = walls[walls.length - 1];
//   const index = walls.findIndex(
//     (wall) => wall.row === lastWall.row && wall.col === lastWall.col && wall.accessDirection === lastWall.accessDirection
//   );

//   // Ensure a valid index and splice the loop portion
//   if (index !== -1 && index < walls.length - 1) {
//     walls.splice(0, index + 1);
//   }
// }
