import * as helpers from './helper';

export const solvePart1 = (): any => {
  let [listOne, listTwo] = helpers.getLists();
  listOne = listOne.sort((a, b) => a - b);
  listTwo = listTwo.sort((a, b) => a - b);

  return calculateSumOfDistances(listOne, listTwo);
};

function calculateSumOfDistances(listOne: number[], listTwo: number[]): number {
  let sum = 0;
  for(let i = 0; i < listOne.length; i++) {
    if (listOne[i] > listTwo[i]) {
      sum += listOne[i] - listTwo[i];
  } else {
    sum += listTwo[i] - listOne[i];
  }
}

return sum;
}
