import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads example input for a specific day and part.
 * @param day - The day number as a string (e.g., "01" for Day 1).
 * @param part - The part number (1 or 2).
 * @returns The content of the example input file.
 */
export const readExampleInput = (day: string, part: number): string => {
  const filePath = path.resolve(__dirname, `../day${day}/example-part${part}.txt`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Example input for Day ${day}, Part ${part} not found at ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf-8').trim();
};

/**
 * Reads the custom input file for testing edge cases.
 * @param day - The day number as a string (e.g., "01" for Day 1).
 * @returns The content of the custom input file.
 */
export const readCustomInput = (day: string): string => {
    const filePath = path.resolve(__dirname, `../day${day}/custom-input.txt`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Custom input for Day ${day} not found at ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf-8').trim();
  };