import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const startTime = Date.now();
const cwd = dirname(__filename);
const path = join(cwd, 'input.txt');
const file = readFileSync(path, 'utf-8').split('\n');

const field: string[][] = [];
const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
];
let pos: [number, number] = [-1, -1];

for (const line of file) {
    field.push([...line]);
    if (pos[0] > -1) continue;
    const gStart = line.indexOf('^');
    if (gStart !== -1) {
        pos = [gStart, field.length - 1];
    }
}

function turnRight(dir: number): number {
    dir += 1;
    if (dir === 4) dir = 0;
    return dir;
}

function posIsObstacle(pos: [number, number]): boolean {
    return field[pos[1]][pos[0]] === '#';
}

function posIsStart(pos: [number, number]): boolean {
    return field[pos[1]][pos[0]] === '^';
}

function checkOutOfBounds(pos: [number, number]): boolean {
    return pos[0] < 0 || pos[0] >= field[0].length || pos[1] < 0 || pos[1] >= field.length;
}

function getNext(pos: [number, number], dir: number): [number, number] {
    return [pos[0] + directions[dir][0], pos[1] + directions[dir][1]];
}

function checkForLoop(pos: [number, number], dir: number, obstaclePos: [number, number]): boolean | Record<string, number[]> {
    const trace: Record<string, number[]> = {};
    while (true) {
        const nextPos = getNext(pos, dir);
        if (checkOutOfBounds(nextPos)) {
            return false;
        }
        if (posIsObstacle(nextPos) || (nextPos[0] === obstaclePos[0] && nextPos[1] === obstaclePos[1])) {
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
function findLoopsInField() {
    let mainDir = 0;
    const result: Record<string, boolean> = {};
    const visited: Record<string, boolean> = {};

    while (true) {
        const nextPos = getNext(pos, mainDir);
        if (checkOutOfBounds(nextPos)) {
            break;
        }
        if (posIsObstacle(nextPos)) {
            mainDir = turnRight(mainDir);
            continue;
        }

        const obstacle = nextPos;
        const key = `${obstacle[0]},${obstacle[1]}`;
        if (!result[key] && !posIsStart(obstacle) && !visited[key]) {
            const foundLoop = checkForLoop(pos, turnRight(mainDir), obstacle);
            if (foundLoop) {
                result[key] = true;
            }
        }
        pos = nextPos;
        visited[`${pos[0]},${pos[1]}`] = true;
    }
    console.log(`--- ${(Date.now() - startTime) / 1000} seconds ---`);
    console.log('result', Object.keys(result).length);
}

findLoopsInField();