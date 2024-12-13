import * as helpers from './helper';

const memo = new Map<string, number>();

function memoKey(stone: string, steps: number): string {
  return `${stone}#${steps}`;
}

export const solvePart2 = (): any => {
  const stones = helpers.getInputAsArray();
  // Implement solution logic
  
  return countStonesAfterBlinks(stones, 75);
};

function countStonesAfterBlinks(initialStones: string[], steps: number): number {
  let total = 0;
  for (const stone of initialStones) {
    total += countStones(stone, steps);
  }
  return total;
}


function countStones(stone: string, steps: number): number {
  if (steps === 0) {
    return 1;
  }
  
  const key = memoKey(stone, steps);
  if (memo.has(key)) {
    return memo.get(key)!;
  }
  
  const transformedStones = helpers.applyRuleAndReturnStones(stone);
  
  let count = 0;
  for (const s of transformedStones) {
    count += countStones(s, steps - 1);
  }
  
  memo.set(key, count);
  return count;
}
