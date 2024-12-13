import * as helpers from './helper';
import { LinkedList, LinkedListNode } from './models/linked-list';

export const solvePart1 = (): any => {
  const linkedList = helpers.getLinkedList();
  // Implement solution logic
  traverseList(linkedList);
  return linkedList.length;
};

function traverseList(linkedList: LinkedList): void {
  for(let i = 0; i < 25; i++) {
    // linkedList.printList();
    linkedList.processList();
  }
}
