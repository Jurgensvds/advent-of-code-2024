const fs = require('fs');
const path = require('path');

const day = process.argv[2];
if (!day) {
  console.error('Please specify a day: npm run day -- DAY_NUMBER');
  process.exit(1);
}

const paddedDay = day.padStart(2, '0'); // Ensure the day number is two digits
const dayDir = path.join(__dirname, `../src/day${paddedDay}`);
const testDir = path.join(__dirname, `../tests/day${paddedDay}`);
const testFile = path.join(testDir, `day${paddedDay}.test.ts`);

// Check if the day folder already exists
if (fs.existsSync(dayDir) || fs.existsSync(testDir)) {
  console.error(`Day ${day} already exists`);
  process.exit(1);
}

// Create day directory and files in src
fs.mkdirSync(dayDir);
fs.writeFileSync(path.join(dayDir, 'helper.ts'), `import { readInput } from '../utils/file-reader';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('${paddedDay}');
};
`);
fs.writeFileSync(
  path.join(dayDir, 'part1.ts'),
  `import * as helpers from './helper';

export const solvePart1 = (): any => {
  const input = helpers.getInput();
  // Implement solution logic
  return;
};
`
);
fs.writeFileSync(
  path.join(dayDir, 'part2.ts'),
  `import * as helpers from './helper';

export const solvePart2 = (): any => {
  const input = helpers.getInput();
  // Implement solution logic
  return;
};
`
);
fs.writeFileSync(
  path.join(dayDir, 'index.ts'),
  `import { solvePart1 } from './part1';
import { solvePart2 } from './part2';

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
`
);

// Create test directory and files in tests
fs.mkdirSync(testDir);
fs.writeFileSync(path.join(testDir, 'example-part1.txt'), ''); // Example input for Part 1
fs.writeFileSync(path.join(testDir, 'example-part2.txt'), ''); // Example input for Part 2
fs.writeFileSync(path.join(testDir, 'custom-input.txt'), '');  // Custom edge-case input
fs.writeFileSync(
  testFile,
  `import { solvePart1 } from '../../src/day${paddedDay}/part1';
import { solvePart2 } from '../../src/day${paddedDay}/part2';
import { readExampleInput, readCustomInput } from '../utils/test-utils';

describe('Day ${parseInt(day)}', () => {
  test('Part 1 Example', () => {
    const input = readExampleInput('${paddedDay}', 1);
    jest.spyOn(require('../../src/day${paddedDay}/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(/* expected result */);
  });

  test('Part 2 Example', () => {
    const input = readExampleInput('${paddedDay}', 2);
    jest.spyOn(require('../../src/day${paddedDay}/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(/* expected result */);
  });

  test('Part 1 Custom Input', () => {
    const input = readCustomInput('${paddedDay}');
    jest.spyOn(require('../../src/day${paddedDay}/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart1()).toBe(/* expected result */);
  });

  test('Part 2 Custom Input', () => {
    const input = readCustomInput('${paddedDay}');
    jest.spyOn(require('../../src/day${paddedDay}/helper'), 'getInput').mockReturnValue(input);
    expect(solvePart2()).toBe(/* expected result */);
  });
});
`
);

console.log(`Day ${day} setup complete with test and example files.`);