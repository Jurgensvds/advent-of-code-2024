import { solvePart1 } from '../../src/day07/part1';
import { solvePart2 } from '../../src/day07/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 7', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('07', 1);
    jest.spyOn(require('../../src/day07/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(3749);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('07', 2);
    jest.spyOn(require('../../src/day07/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(11387);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('07');
  //   jest.spyOn(require('../../src/day07/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('07');
  //   jest.spyOn(require('../../src/day07/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(/* expected result */);
  // });
});
