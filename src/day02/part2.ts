import * as helpers from './helper';
import { Safety } from './models/safety';

export const solvePart2 = (): any => {
  const reports = helpers.getReports();

  let safeAmount = 0;
  let unsafeAmount = 0;

  for(let report of reports) {
    const r = [...report];
    const safety = calculateLists(report);
    if(safety === Safety.Safe) {
      safeAmount++;
    } else {
      unsafeAmount++;
    }
  }
  // Implement solution logic
  return safeAmount;
};

function calculateLists(report: number[]): Safety {
  if (calculateSafety(report) === Safety.Safe) {
    return Safety.Safe;
  }

  for(let i = 0; i < report.length; i++) {
    const r = [...report];
    r.splice(i, 1);
    if(calculateSafety(r) === Safety.Safe) {
      return Safety.Safe;
    }
  }

  return Safety.Unsafe;
}

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
