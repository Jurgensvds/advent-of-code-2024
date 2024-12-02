import * as helpers from './helper';
import { Safety } from './models/safety';

export const solvePart1 = (): any => {
  const reports = helpers.getReports();

  let safeAmount = 0;
  let unsafeAmount = 0;

  for(let report of reports) {
    const safety = calculateSafety(report);
    if(safety === Safety.Safe) {
      safeAmount++;
    } else {
      unsafeAmount++;
    }
  }
  // Implement solution logic
  return safeAmount;
};

function calculateSafety(report: number[]): Safety {
  let increasing = undefined;
  let maxStepAmount = 3;
  for(let i = 1; i < report.length; i++) {
    if (increasing === undefined) {
      increasing = report[i] > report[i - 1];
    }

    if(helpers.checkSafety(report[i], report[i - 1], maxStepAmount, increasing) === Safety.Unsafe) {
      return Safety.Unsafe;
    }
  }

  return Safety.Safe;
}
