import * as helpers from './helper';
import { MapCoordinate } from './models/coordinate';

export const solvePart1 = (): any => {
  const map = helpers.getAntennaMap();

  const antiNodeCount = placeAllAntinodesAndGetTotal(map);
  // const mapString = map.map((row) => row.join('')).join('\n');
  
  // Implement solution logic
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

        const antinodePlacement = determineAntinodePlacement(map, positions[i], positions[j]);
        if (antinodePlacement) {
          totalAntiNodes += placeAntinode(map, antinodePlacement) ? 1 : 0;
        }
      }
    }
  });

  return totalAntiNodes;
}

function determineAntinodePlacement(map: string[][], sourceAntenna: MapCoordinate, targetAntenna: MapCoordinate): MapCoordinate | null {
  const offSetAmount: MapCoordinate = { row: targetAntenna.row - sourceAntenna.row, col: targetAntenna.col - sourceAntenna.col };

  const antiNodeRow = targetAntenna.row + offSetAmount.row;
  const antiNodeCol = targetAntenna.col + offSetAmount.col;

  if(antiNodeRow < 0 || antiNodeRow >= map.length || antiNodeCol < 0 || antiNodeCol >= map[0].length) {
    return null;
  }

  return { row: antiNodeRow, col: antiNodeCol };
}

function placeAntinode(map: string[][], coord: MapCoordinate): boolean {
  if (map[coord.row][coord.col] !== '#') {
    map[coord.row][coord.col] = '#';
    return true;
  }

  return false
}
