import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads the input file for a specific day.
 * @param day - The day number as a string (e.g., "01" for Day 1).
 * @returns The content of the input file as a string.
 */
export const readInput = (day: string): string => {
  const filePath = path.resolve(__dirname, `../day${day}/input.txt`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input file for Day ${day} not found at ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf-8').trim();
};