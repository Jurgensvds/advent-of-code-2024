import { solvePart1 } from '../../src/day01/part1';
import { solvePart2 } from '../../src/day01/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 1', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('01', 1);
    jest.spyOn(require('../../src/day01/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(11);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('01', 2);
    jest.spyOn(require('../../src/day01/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(31);
  });
});
