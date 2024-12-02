const { exec } = require('child_process');

const day = process.argv[2];
if (!day) {
  console.error('Please specify a day: npm run test:day -- DAY_NUMBER');
  process.exit(1);
}

const paddedDay = day.padStart(2, '0'); // Ensure the day is two digits
const testFile = `tests/day${paddedDay}/day${paddedDay}.test.ts`;

exec(`npx jest ${testFile} --watch`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error running tests for Day ${day}:\n${stderr}`);
    return;
  }
  console.log(stdout);
});