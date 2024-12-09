import { readInput } from '../utils/file-reader';
import { get2DGrid } from '../utils/get-2d-grid';
import { AntennaPositions } from './models/antenna-map';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('08');
};

export const getAntennaMap = (): string[][] => {
  return get2DGrid(getInput());
}

export const getAntennaPositions = (antennaMap: string[][]): AntennaPositions => {
  const positions: AntennaPositions = {};
  for (let i = 0; i < antennaMap.length; i++) {
    for (let j = 0; j < antennaMap[i].length; j++) {
      const antenna = antennaMap[i][j];
      if (antenna !== '.') {
        if (!positions[antenna]) {
          positions[antenna] = [];
        }
        positions[antenna].push({ row: i, col: j });
      }
    }
  }
  return positions;
};
