import { solvePart1 } from '../../src/day12/part1';
import { solvePart2 } from '../../src/day12/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 12', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('12', 1);
    jest.spyOn(require('../../src/day12/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(1930);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('12', 2);
    jest.spyOn(require('../../src/day12/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(1206);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('12');
  //   jest.spyOn(require('../../src/day12/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('12');
  //   jest.spyOn(require('../../src/day12/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(/* expected result */);
  // });
});
