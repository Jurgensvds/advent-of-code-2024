import { readInput } from '../utils/file-reader';
import { FileBlock } from './models/file-block';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('09');
};

export const getFileBlocks = (): FileBlock[] => {
  const input = getInput();
  const fileBlocks: FileBlock[] = [];
  for (let i = 0; i < input.length; i+=2) {
    const fileBlock: number = parseInt(input[i]);
    let freeSpace: number = 0;
    if(i+1 < input.length) {
      freeSpace = parseInt(input[i + 1]);
    }

    fileBlocks.push({id: i/2, fileBlockSize: fileBlock, freeSpace});
  }

  return fileBlocks;
}

export const mapFileBlocksToBlockRepresentation = (fileBlocks: FileBlock[]): string[] => {
  const blockRep: string[] = [];
  for (let block of fileBlocks) {
    for(let i = 0; i < block.fileBlockSize; i++) {
      blockRep.push(block.id.toString());
    }
    for(let i = 0; i < block.freeSpace; i++) {
      blockRep.push('.');
    }
  }

  return blockRep;
}

