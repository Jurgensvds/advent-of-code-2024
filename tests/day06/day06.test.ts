import { solvePart1 } from '../../src/day06/part1';
import { solvePart2 } from '../../src/day06/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 6', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('06', 1);
    jest.spyOn(require('../../src/day06/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(41);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('06', 2);
    jest.spyOn(require('../../src/day06/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(6);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('06');
  //   jest.spyOn(require('../../src/day06/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('06');
  //   jest.spyOn(require('../../src/day06/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(2);
  // });
});
