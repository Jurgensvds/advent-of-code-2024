import { readInput } from '../utils/file-reader';
import { Safety } from './models/safety';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('02');
};

export const getReports = (): number[][] => {
  const input = getInput();
  const reports = input.split('\n').map((row) => row.split(/\s+/).map((num) => parseInt(num, 10)));

  return reports;
}

export const checkSafety = (num1: number, num2: number, maxStepAmount: number, increasing: boolean): Safety => {
  if (num1 === num2) {
    return Safety.Unsafe;
  }

  if ((increasing && num1 < num2) || (!increasing && num1 > num2)) {
    // console.log([num1, num2], '02')
    return Safety.Unsafe;
  }

  if (increasing && (num1 - maxStepAmount - num2) > 0) {
    // console.log([num1, num2], '03')
    return Safety.Unsafe;
  }
  if (!increasing && (num1 + maxStepAmount - num2) < 0) {
    // console.log([num1, num2], '04')
    return Safety.Unsafe;
  }

  return Safety.Safe;
}
