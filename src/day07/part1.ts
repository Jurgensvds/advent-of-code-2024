import * as helpers from './helper';
import { SumAndValues } from './models/sum-and-values';

export const solvePart1 = (): any => {
  const sumAndValues = helpers.getSumAndValues();
  // Implement solution logic
  return calculateTotalCalibrationResult(sumAndValues);
};

export function calculateTotalCalibrationResult(equations: SumAndValues[]): number {
  let totalCalibrationResult = 0;

  for (const equation of equations) {
      if (canAchieveSum(equation.sum, equation.values)) {
          totalCalibrationResult += equation.sum;
      }
  }

  return totalCalibrationResult;
}

function canAchieveSum(targetSum: number, values: number[]): boolean {
  return evaluateCombinations(values, 0, targetSum);
}

function evaluateCombinations(values: number[], index: number, targetSum: number): boolean {
  if (index === values.length - 1) {
      return values[0] === targetSum;
  }

  const nextValue = values[index + 1];

  const addPath = evaluateCombinations(
      [values[0] + nextValue, ...values.slice(index + 2)],
      index,
      targetSum
  );

  if (addPath) return true;

  const multiplyPath = evaluateCombinations(
      [values[0] * nextValue, ...values.slice(index + 2)],
      index,
      targetSum
  );

  return multiplyPath;
}
