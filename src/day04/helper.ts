import { readInput } from '../utils/file-reader';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('04');
};

export const getGrid = (): string[][] => {
  const input = getInput().trim();

  return input.split('\n').map((row) => row.trim().split(''));
};
