import { readInput } from '../utils/file-reader';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('03');
};

export const getAllPureMul = (): string[] => {
  const input = getInput();

  const allMulExpressions = input.match(/mul\(\d+,\d+\)/g) || [];

  return allMulExpressions;
};

export const getAllMulWithDoAndDont = (): string[] => {
  const input = getInput();

  const allMulExpressions =
    input.match(/mul\(\d+,\d+\)|don't\(\)|do\(\)/g) || [];

  return allMulExpressions;
};
