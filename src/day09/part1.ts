import * as helpers from './helper';
import { FileBlock } from './models/file-block';

export const solvePart1 = (): any => {
  const fileBlocks = helpers.getFileBlocks();
  const blockRepresentation = helpers.mapFileBlocksToBlockRepresentation(fileBlocks);
  // Implement solution logic
  defragBlockRepresentation(blockRepresentation, fileBlocks)

  return checkSum(blockRepresentation);
};

function defragBlockRepresentation(blockRepresentation: string[], fileBlocks: FileBlock[]): string[] {
  let indexOfLastDigit = blockRepresentation.lastIndexOf(fileBlocks[fileBlocks.length - 1].id.toString());
  
  for (let i = 0; i < blockRepresentation.length; i++) {
    if (i >= indexOfLastDigit) {
      break;
    }

    else if (blockRepresentation[i] === '.') {
      blockRepresentation[i] = blockRepresentation[indexOfLastDigit];
      blockRepresentation[indexOfLastDigit] = '.';
      while (blockRepresentation[indexOfLastDigit] === '.' && indexOfLastDigit > i) {
        indexOfLastDigit--;
      }
    }
  }
  return blockRepresentation;
}

function checkSum(blockRepresentation: string[]): number {
  let sum = 0;
  for (let i = 0; i < blockRepresentation.length; i++) {
    if (blockRepresentation[i] === '.') {
      break;
    }
    sum += parseInt(blockRepresentation[i]) * i;
  }
  return sum;
}
