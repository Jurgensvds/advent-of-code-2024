import { solvePart1 } from '../../src/day03/part1';
import { solvePart2 } from '../../src/day03/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day 3', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('03', 1);
    jest
      .spyOn(require('../../src/day03/helper'), 'getInput')
      .mockReturnValue(input);
    expect(solvePart1()).toBe(161);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('03', 2);
    jest
      .spyOn(require('../../src/day03/helper'), 'getInput')
      .mockReturnValue(input);
    expect(solvePart2()).toBe(48);
  });

  // test('Part 1 Custom Input', () => {
  //   const input = readCustomInput('03');
  //   jest.spyOn(require('../../src/day03/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart1()).toBe(/* expected result */);
  // });

  // test('Part 2 Custom Input', () => {
  //   const input = readCustomInput('03');
  //   jest.spyOn(require('../../src/day03/helper'), 'getInput').mockReturnValue(input);
  //   expect(solvePart2()).toBe(/* expected result */);
  // });
});
