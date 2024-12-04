import * as helpers from './helper';

export const solvePart1 = (): any => {
  const allMul = helpers.getAllPureMul();
  const allMultiples: number[][] = allMul.map((mul) => {
    return mul
      .substring(4, mul.length - 1)
      .split(',')
      .map((num) => parseInt(num));
  });

  // Implement solution logic
  return allMultiples.reduce((acc, [a, b]) => acc + a * b, 0);
};
