import * as helpers from './helper';
import { FileBlock } from './models/file-block';

export const solvePart2 = (): any => {
  const fileBlocksArray = helpers.getFileBlocks();
  const blockRepresentation = helpers.mapFileBlocksToBlockRepresentation(fileBlocksArray);
  // Implement solution logic
  defragBlockRepresentation(blockRepresentation, fileBlocksArray);

  return checkSum(blockRepresentation);
  ;
};


function defragBlockRepresentation(blockRepresentation: string[], fileBlocksArray: FileBlock[]): string[] {
  for (let z = fileBlocksArray.length - 1; z >= 0; z--) {
    const fileID = fileBlocksArray[z].id.toString();

    const start = blockRepresentation.indexOf(fileID);
    if (start === -1) {
      continue;
    }
    const end = blockRepresentation.lastIndexOf(fileID);
    const fileLen = end - start + 1;

    const freeSpot = findContiguousFreeSpace(blockRepresentation, fileLen, start);
    if (freeSpot === -1) {
      continue;
    }

    for (let i = 0; i < fileLen; i++) {
      blockRepresentation[freeSpot + i] = fileID;
    }

    for (let i = start; i <= end; i++) {
      blockRepresentation[i] = '.';
    }
  }
  
  return blockRepresentation;
}

function findContiguousFreeSpace(blockRepresentation: string[], neededLength: number, limitIndex: number): number {
  let runStart = -1;
  let runLength = 0;

  for (let i = 0; i < limitIndex; i++) {
    if (blockRepresentation[i] === '.') {
      if (runStart === -1) {
        runStart = i;
        runLength = 1;
      } else {
        runLength++;
      }
      
      if (runLength >= neededLength) {
        return runStart;
      }
    } else {
      runStart = -1;
      runLength = 0;
    }
  }

  return -1;
}


function checkSum(blockRepresentation: string[]): number {
  let sum = 0;
  for (let i = 0; i < blockRepresentation.length; i++) {
    if (blockRepresentation[i] !== '.') {
      sum += parseInt(blockRepresentation[i]) * i;
    }
  }
  return sum;
}

