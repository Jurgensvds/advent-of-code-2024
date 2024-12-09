import * as helpers from './helper';
import { MapCoordinate } from './models/coordinate';

let allMaps: string[] = [];

export const solvePart2 = (): any => {
  const map = helpers.getAntennaMap();
  allMaps.push(convertMapToString(map));
  const antiNodeCount = placeAllAntinodesAndGetTotal(map);
  // const mapString = map.map((row) => row.join('')).join('\n');
  // console.log(mapString);
  
  // Implement solution logic
  // setTimeout(() => printAllMapsWithDelay(30), 1000);
  return antiNodeCount;
};

function placeAllAntinodesAndGetTotal(map: string[][]): number {
  let totalAntiNodes = 0;
  const allAntennaPositions = helpers.getAntennaPositions(map);
  Object.keys(allAntennaPositions).forEach((antenna) => {
    const positions = allAntennaPositions[antenna];
    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions.length; j++) {
        if (i === j) {
          continue;
        }

        const antinodesPlacement = determineAntinodesPlacement(map, positions[i], positions[j]);
        if (antinodesPlacement.length > 0) {
          for (const coord of antinodesPlacement) {
            const placed = placeAntinode(map, coord);
            allMaps.push(convertMapToString(map));
            totalAntiNodes += placed ? 1 : 0;
          }
        }
      }
    }
  });

  return totalAntiNodes;
}

function determineAntinodesPlacement(map: string[][], sourceAntenna: MapCoordinate, targetAntenna: MapCoordinate): MapCoordinate[] {
  const offSetAmount: MapCoordinate = { row: targetAntenna.row - sourceAntenna.row, col: targetAntenna.col - sourceAntenna.col };
  const allNewAntinodes: MapCoordinate[] = [];

  let antiNodeRow = targetAntenna.row;
  let antiNodeCol = targetAntenna.col;

  while(antiNodeRow >= 0 && antiNodeRow < map.length && antiNodeCol >= 0 && antiNodeCol < map[0].length) {
    allNewAntinodes.push({ row: antiNodeRow, col: antiNodeCol });

    antiNodeCol += offSetAmount.col;
    antiNodeRow += offSetAmount.row;
  }

  return allNewAntinodes;
}

function placeAntinode(map: string[][], coord: MapCoordinate): boolean {
  if (map[coord.row][coord.col] !== '#' && map[coord.row][coord.col] !== '+') {
    if(map[coord.row][coord.col] === '.') {
      map[coord.row][coord.col] = '#';
    } else {
      map[coord.row][coord.col] = '+';
    }
    return true;
  }

  return false
}

function convertMapToString(map: string[][]): string {
  return map.map((row) => row.join('')).join('\n').replace(/\./g, ' ');
}


function printAllMapsWithDelay(delay: number): void {
  let index = 0;

  function printNextMap() {
    if (index < allMaps.length) {
      console.log(allMaps[index] + '\n');
      index++;
      setTimeout(printNextMap, delay);
    }
  }

  printNextMap();
}