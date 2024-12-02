import * as helpers from './helper';

export const solvePart2 = (): any => {
  let [listOne, listTwo] = helpers.getLists();
  // Implement solution logic
  
  return calculateSimilarityScore(listOne, listTwo);
};

function calculateSimilarityScore(listOne: number[], listTwo: number[]): number {
  let score = 0;

  for(let item of listOne) {
    let count = 0;
    for(let item2 of listTwo) {
      if (item === item2) {
        count++;
      }
    }

    score += (count * item);
  }

  return score;
} 
