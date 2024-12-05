import { solvePart1 } from '../../src/day05/part1';
import { solvePart2 } from '../../src/day05/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 5', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('05', 1);
    jest.spyOn(require('../../src/day05/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(143);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('05', 2);
    jest.spyOn(require('../../src/day05/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(123);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('05');
  //   jest.spyOn(require('../../src/day05/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('05');
  //   jest.spyOn(require('../../src/day05/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(/* expected result */);
  // });
});
