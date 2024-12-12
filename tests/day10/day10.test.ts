import { solvePart1 } from '../../src/day10/part1';
import { solvePart2 } from '../../src/day10/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 10', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('10', 1);
    jest.spyOn(require('../../src/day10/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(36);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('10', 2);
    jest.spyOn(require('../../src/day10/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(81);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('10');
  //   jest.spyOn(require('../../src/day10/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('10');
  //   jest.spyOn(require('../../src/day10/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(/* expected result */);
  // });
});
