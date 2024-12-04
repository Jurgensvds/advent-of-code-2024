import * as helpers from './helper';

export const solvePart2 = (): any => {
  const allMulWithDoDont = helpers.getAllMulWithDoAndDont();
  const allMultiplesStrings: string[] = [];
  let doMul: boolean = true;
  for (let i = 0; i < allMulWithDoDont.length; i++) {
    if (allMulWithDoDont[i] === 'do()' || allMulWithDoDont[i] === "don't()") {
      doMul = allMulWithDoDont[i] === 'do()';
    }
    if (allMulWithDoDont[i].includes('mul') && (i === 0 || doMul)) {
      allMultiplesStrings.push(allMulWithDoDont[i]);
    }
  }

  const allMultiples: number[][] = allMultiplesStrings.map((mul) => {
    return mul
      .substring(4, mul.length - 1)
      .split(',')
      .map((num) => parseInt(num));
  });
  // Implement solution logic
  return allMultiples.reduce((acc, [a, b]) => acc + a * b, 0);
};
