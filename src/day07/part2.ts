import * as helpers from './helper';
import { SumAndValues } from './models/sum-and-values';

export const solvePart2 = (): any => {
  const sumAndValues = helpers.getSumAndValues();
  // Implement solution logic
  return calculateTotalCalibrationResultWithConcatenation(sumAndValues);
};

export function calculateTotalCalibrationResultWithConcatenation(equations: SumAndValues[]): number {
  let totalCalibrationResult = 0;

  for (const equation of equations) {
      if (canAchieveSumWithConcatenation(equation.sum, equation.values)) {
          totalCalibrationResult += equation.sum;
      }
  }

  return totalCalibrationResult;
}

function canAchieveSumWithConcatenation(targetSum: number, values: number[]): boolean {
  return evaluateCombinationsWithConcatenation(values, 0, targetSum);
}

function evaluateCombinationsWithConcatenation(values: number[], index: number, targetSum: number): boolean {
  if (index === values.length - 1) {
      return values[0] === targetSum;
  }

  const nextValue = values[index + 1];

  const addPath = evaluateCombinationsWithConcatenation(
      [values[0] + nextValue, ...values.slice(index + 2)],
      index,
      targetSum
  );

  if (addPath) return true;

  const multiplyPath = evaluateCombinationsWithConcatenation(
      [values[0] * nextValue, ...values.slice(index + 2)],
      index,
      targetSum
  );

  if (multiplyPath) return true;

  const concatPath = evaluateCombinationsWithConcatenation(
      [parseInt(`${values[0]}${nextValue}`, 10), ...values.slice(index + 2)],
      index,
      targetSum
  );

  return concatPath;
}
