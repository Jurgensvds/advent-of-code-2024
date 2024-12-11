import { solvePart1 } from '../../src/day09/part1';
import { solvePart2 } from '../../src/day09/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 9', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('09', 1);
    jest.spyOn(require('../../src/day09/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(1928);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('09', 2);
    jest.spyOn(require('../../src/day09/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(2858);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('09');
  //   jest.spyOn(require('../../src/day09/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  test('Part 2 Custom Input', () => {
    const input = readCustomInput('09');
    jest.spyOn(require('../../src/day09/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(3215);
  });
});
