import { readInput } from '../utils/file-reader';
import { get2DGrid } from '../utils/get-2d-grid';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('04');
};

export const getGrid = (): string[][] => {
  return get2DGrid(getInput());
};
