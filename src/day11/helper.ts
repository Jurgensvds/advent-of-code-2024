import { readInput } from '../utils/file-reader';
import { LinkedList, LinkedListNode } from './models/linked-list';

/**
 * Reads the input.txt file for this day and returns its content as a string.
 * @returns The input file content as a string.
 */
export const getInput = (): string => {
  return readInput('11');
};

export const getInputAsArray = (): string[] => {
  return getInput().split(' ');
}

export const getLinkedList = (): LinkedList => {
  const input = getInput();
  const linkedList = new LinkedList();
  input.split(' ').forEach((num) => {
    linkedList.add(parseInt(num));
  });

  return linkedList;
};

export const applyRule = (node: LinkedListNode, linkedList: LinkedList): boolean => {
  if (node.value === 0) {
    node.value = 1;
    return false;
  } else if (node.value.toString().length % 2 === 0) {
    const [firstHalf, secondHalf] = splitNumber(node.value);
    node.value = firstHalf;
    const newNode = new LinkedListNode(secondHalf);
    newNode.next = node.next;
    node.next = newNode;
    linkedList.length++;
    return true;
  } else {
    node.value = node.value * 2024;
    return false;
  }
}

export const applyRuleAndReturnStones = (stone: string): string[] => {
  if (stone === '0') {
    return ['1'];
  } else if (stone.length % 2 === 0) {
    const [firstHalf, secondHalf] = splitNumber(parseInt(stone));
    return [firstHalf.toString(), secondHalf.toString()];
  } else {
    return [`${parseInt(stone) * 2024}`];
  }
}


function splitNumber(num: number): [number, number] {
  const numStr = num.toString();
  const half = Math.floor(numStr.length / 2);
  return [parseInt(numStr.slice(0, half)), parseInt(numStr.slice(half))];
}


