import { solvePart1 } from '../../src/day04/part1';
import { solvePart2 } from '../../src/day04/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 4', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('04', 1);
    jest
      .spyOn(require('../../src/day04/helper'), 'getInput')
      .mockReturnValue(input);
    expect(solvePart1()).toBe(18);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('04', 2);
    jest
      .spyOn(require('../../src/day04/helper'), 'getInput')
      .mockReturnValue(input);
    expect(solvePart2()).toBe(9);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('04');
  //   jest.spyOn(require('../../src/day04/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('04');
  //   jest.spyOn(require('../../src/day04/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(/* expected result */);
  // });
});
