import { readInput } from '../utils/file-reader';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('01');
};

export const getLists = (): [number[], number[]] => {
  const input = getInput();
  const listOne: number[] = [];
  const listTwo: number[] = [];

  const rows = input.split('\n');
  rows.forEach((row) => {
    const [l1, l2] = row.split(/\s+/);
    listOne.push(parseInt(l1, 10));
    listTwo.push(parseInt(l2, 10));
  });

  return [listOne, listTwo];
}
