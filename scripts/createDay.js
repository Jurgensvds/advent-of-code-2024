const fs = require('fs');
const path = require('path');

const day = process.argv[2];
if (!day) {
  console.error('Please specify a day: npm run day -- DAY_NUMBER');
  process.exit(1);
}

const dayDir = path.join(__dirname, `../src/day${day.padStart(2, '0')}`);
if (fs.existsSync(dayDir)) {
  console.error(`Day ${day} already exists`);
  process.exit(1);
}

fs.mkdirSync(dayDir);
fs.writeFileSync(path.join(dayDir, 'input.txt'), '');
fs.writeFileSync(path.join(dayDir, 'helper.ts'), 'export const helper = () => {\n  return;\n};\n');
fs.writeFileSync(
  path.join(dayDir, 'part1.ts'),
  `import * as helpers from './helper';\n\nexport const solvePart1 = () => {\n  // Use helpers if needed\n  return;\n};\n`
);
fs.writeFileSync(
  path.join(dayDir, 'part2.ts'),
  `import * as helpers from './helper';\n\nexport const solvePart2 = () => {\n  // Use helpers if needed\n  return;\n};\n`
);
fs.writeFileSync(
  path.join(dayDir, 'index.ts'),
  `import { solvePart1 } from './part1';\nimport { solvePart2 } from './part2';\n\nconsole.log('Part 1:', solvePart1());\nconsole.log('Part 2:', solvePart2());\n`
);

fs.writeFileSync(
  path.join(dayDir, 'helper.ts'),
  `import { readInput } from '../utils/file-reader';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('${day.padStart(2, '0')}');
};
`
);

console.log(`Day ${day} setup complete.`);