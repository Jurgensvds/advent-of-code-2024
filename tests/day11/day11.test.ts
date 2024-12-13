import { solvePart1 } from '../../src/day11/part1';
import { solvePart2 } from '../../src/day11/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 11', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('11', 1);
    jest.spyOn(require('../../src/day11/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(55312);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('11', 2);
    jest.spyOn(require('../../src/day11/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(65601038650482);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('11');
  //   jest.spyOn(require('../../src/day11/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('11');
  //   jest.spyOn(require('../../src/day11/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(/* expected result */);
  // });
});
