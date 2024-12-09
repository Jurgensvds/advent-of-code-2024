import { readInput } from '../utils/file-reader';
import { SumAndValues } from './models/sum-and-values';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('07');
};

export const getSumAndValues = (): SumAndValues[] => {
  return getInput().split("\n").filter(line => line.trim() !== "").map(line => {
      const [sumPart, valuesPart] = line.split(":").map(part => part.trim());
      const sum = parseInt(sumPart, 10);
      const values = valuesPart.split(" ").map(value => parseInt(value, 10));
      return { sum, values };
  });
}

