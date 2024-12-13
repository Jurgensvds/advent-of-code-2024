import * as helpers from '../helper';

export class LinkedList {
    head: LinkedListNode | null;
    tail: LinkedListNode | null;
    current: LinkedListNode | null;
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
        this.length = 0;
    }

    add(value: number): void {
        const newNode: LinkedListNode = { value, next: null, prev: null };
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    processList(): void {
        this.current = this.head;
        while (this.current) {
            const moveNodeExtra = helpers.applyRule(this.current, this);
            this.next();
            if (moveNodeExtra) {
                this.next();
            }
        }
    }

    next(): void {
        if (this.current) {
            this.current = this.current.next;
        }
    }

    printList(): void {
        let currentNode: LinkedListNode | null = this.head;

        const values: number[] = [];
        while (currentNode) {
            values.push(currentNode.value);
            currentNode = currentNode.next;
        }

        console.log(values.join(' -> '));
    }
}

export class LinkedListNode {
    value: number;
    next: LinkedListNode | null;
    prev: LinkedListNode | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}