function multiplyBy2024(stone: string): string {
    // Convert to BigInt and multiply by 2024
    const num = BigInt(stone);
    const result = num * BigInt(2024);
    return result.toString();
  }
  
  function splitStone(stone: string): [string, string] {
    const length = stone.length;
    const mid = length / 2;
    let left = stone.slice(0, mid);
    let right = stone.slice(mid);
    
    // Trim leading zeros
    left = left.replace(/^0+/, "");
    right = right.replace(/^0+/, "");
    
    // If trimming leads to empty, turn them into "0"
    if (left === "") left = "0";
    if (right === "") right = "0";
    
    return [left, right];
  }
  
  function transformStoneOnce(stone: string): string[] {
    // Apply one blink transformation according to the rules
    if (stone === "0") {
      // Rule 1: 0 -> 1
      return ["1"];
    }
    
    const length = stone.length;
    // Check if length is even
    if (length % 2 === 0) {
      // Rule 2: split into two stones
      const [left, right] = splitStone(stone);
      return [left, right];
    } else {
      // Rule 3: multiply by 2024
      const multiplied = multiplyBy2024(stone);
      return [multiplied];
    }
  }
  
  // Using a Map for memoization
  const memo = new Map<string, number>();
  
  function memoKey(stone: string, steps: number): string {
    return `${stone}#${steps}`;
  }
  
  /**
   * Recursively compute the number of stones after `steps` blinks starting from `stone`.
   */
  function countStones(stone: string, steps: number): number {
    if (steps === 0) {
      // No more transformations, just this stone
      return 1;
    }
    
    const key = memoKey(stone, steps);
    if (memo.has(key)) {
      return memo.get(key)!;
    }
    
    // Transform once
    const transformedStones = transformStoneOnce(stone);
    
    // Sum up counts for each resulting stone after steps-1 more blinks
    let count = 0;
    for (const s of transformedStones) {
      count += countStones(s, steps - 1);
    }
    
    memo.set(key, count);
    return count;
  }
  
  /**
   * Given an initial array of stones and a number of steps `N`,
   * return the total number of stones after `N` blinks.
   */
  export function countStonesAfterBlinks(initialStones: string[], steps: number): number {
    let total = 0;
    for (const stone of initialStones) {
      total += countStones(stone, steps);
    }
    return total;
  }
  