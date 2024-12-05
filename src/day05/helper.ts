import { readInput } from '../utils/file-reader';
import { Rules, RulesAndPrints } from './models/rules-and-prints';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('05');
};

export const getRulesAndPrints = (): RulesAndPrints => {
  const input = getInput();
  
  const [rulesString, printsString] = input.split('\n\n');

  return {
    rules: rulesString.split('\n').reduce((acc, rule) => {
      const [first, second] = rule.split('|').map(Number);
      if (!acc[first]) {
        acc[first] = [];
      }
      acc[first].push(second);
      return acc;
    }, {} as Rules),
    prints: printsString.split('\n').map((print) => {
      return { allValues: print.split(',').map(Number)};
    }),
  }
};
