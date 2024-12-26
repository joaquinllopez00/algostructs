"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = exports.LinkedList = void 0;
/**
 * A functional singly linked list implementation.
 * All operations create new instances, preserving immutability.
 *
 * @template T The type of elements in the list
 * @example
 * ```typescript
 * const list = new LinkedList<number>();
 * const list2 = list.prepend(1).append(2).prepend(0);
 * const list3 = list2.remove(1);
 * ```
 */
class LinkedList {
    /**
     * Creates a new empty LinkedList
     */
    constructor() {
        this.head = null;
        this._size = 0;
    }
    /**
     * Creates a LinkedList from an array of elements
     *
     * @param elements - Array of elements to add to the list
     * @returns A new LinkedList containing all elements
     */
    static from(elements) {
        return elements.reduce((list, element) => list.append(element), new LinkedList());
    }
    /**
     * Returns the size of the list
     */
    size() {
        return this._size;
    }
    /**
     * Checks if the list is empty
     */
    isEmpty() {
        return this.head === null;
    }
    /**
     * Returns the first element in the list
     *
     * @returns The first element or undefined if empty
     */
    first() {
        return this.head?.value;
    }
    /**
     * Creates a new list with an element added to the front
     *
     * @param value - Element to add
     * @returns A new LinkedList with the element added
     */
    prepend(value) {
        const list = new LinkedList();
        list.head = { value, next: this.head };
        list._size = this._size + 1;
        return list;
    }
    /**
     * Creates a new list with an element added to the end
     *
     * @param value - Element to add
     * @returns A new LinkedList with the element added
     */
    append(value) {
        if (this.isEmpty()) {
            return this.prepend(value);
        }
        const list = new LinkedList();
        list._size = this._size + 1;
        // Create new nodes, preserving immutability
        const newNode = { value, next: null };
        let current = null;
        let previous = null;
        // Copy existing nodes
        let oldCurrent = this.head;
        while (oldCurrent !== null) {
            current = { value: oldCurrent.value, next: null };
            if (previous === null) {
                list.head = current;
            }
            else {
                previous.next = current;
            }
            previous = current;
            oldCurrent = oldCurrent.next;
        }
        if (previous) {
            previous.next = newNode;
        }
        return list;
    }
    /**
     * Creates a new list with the first matching element removed
     *
     * @param value - Element to remove
     * @returns A new LinkedList with the element removed
     */
    remove(value) {
        if (this.isEmpty()) {
            return this;
        }
        // If removing head
        if (this.head.value === value) {
            const list = new LinkedList();
            list.head = this.head.next;
            list._size = this._size - 1;
            return list;
        }
        const list = new LinkedList();
        list._size = this._size - 1;
        let current = null;
        let previous = null;
        let found = false;
        // Copy nodes until we find the value to remove
        let oldCurrent = this.head;
        while (oldCurrent !== null) {
            if (!found && oldCurrent.value === value) {
                found = true;
                oldCurrent = oldCurrent.next;
                continue;
            }
            current = { value: oldCurrent.value, next: null };
            if (previous === null) {
                list.head = current;
            }
            else {
                previous.next = current;
            }
            previous = current;
            oldCurrent = oldCurrent.next;
        }
        return found ? list : this;
    }
    /**
     * Creates a new list with elements reversed
     *
     * @returns A new LinkedList with elements in reverse order
     */
    reverse() {
        const list = new LinkedList();
        list._size = this._size;
        let prev = null;
        let current = this.head;
        while (current !== null) {
            const newNode = { value: current.value, next: prev };
            prev = newNode;
            current = current.next;
        }
        list.head = prev;
        return list;
    }
    /**
     * Checks if a value exists in the list
     *
     * @param value - Value to search for
     * @returns true if the value is found
     */
    contains(value) {
        let current = this.head;
        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
    /**
     * Makes the LinkedList iterable
     */
    *[Symbol.iterator]() {
        let current = this.head;
        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
    /**
     * Returns a string representation of the list
     */
    toString() {
        return [...this].join(" -> ");
    }
}
exports.LinkedList = LinkedList;
/**
 * A functional doubly linked list implementation.
 * All operations create new instances, preserving immutability.
 *
 * @template T The type of elements in the list
 * @example
 * ```typescript
 * const list = new DoublyLinkedList<number>();
 * const list2 = list.prepend(1).append(2);
 * for (const item of list2.reverseIterator()) {
 *   console.log(item); // prints 2, then 1
 * }
 * ```
 */
class DoublyLinkedList {
    /**
     * Creates a new empty DoublyLinkedList
     */
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }
    /**
     * Creates a DoublyLinkedList from an array of elements
     *
     * @param elements - Array of elements to add to the list
     * @returns A new DoublyLinkedList containing all elements
     */
    static from(elements) {
        return elements.reduce((list, element) => list.append(element), new DoublyLinkedList());
    }
    /**
     * Returns the size of the list
     */
    size() {
        return this._size;
    }
    /**
     * Checks if the list is empty
     */
    isEmpty() {
        return this.head === null;
    }
    /**
     * Returns the first element in the list
     */
    first() {
        return this.head?.value;
    }
    /**
     * Returns the last element in the list
     */
    last() {
        return this.tail?.value;
    }
    /**
     * Creates a new list with an element added to the front
     *
     * @param value - Element to add
     * @returns A new DoublyLinkedList with the element added
     */
    prepend(value) {
        const list = new DoublyLinkedList();
        list._size = this._size + 1;
        const newNode = {
            value,
            prev: null,
            next: null,
        };
        if (this.isEmpty()) {
            list.head = newNode;
            list.tail = newNode;
            return list;
        }
        // Copy existing nodes
        let current = null;
        let previous = null;
        let oldCurrent = this.head;
        while (oldCurrent !== null) {
            current = {
                value: oldCurrent.value,
                prev: previous,
                next: null,
            };
            if (previous === null) {
                newNode.next = current;
                current.prev = newNode;
                list.head = newNode;
            }
            else {
                previous.next = current;
            }
            previous = current;
            oldCurrent = oldCurrent.next;
        }
        list.tail = current;
        return list;
    }
    /**
     * Creates a new list with an element added to the end
     *
     * @param value - Element to add
     * @returns A new DoublyLinkedList with the element added
     */
    append(value) {
        if (this.isEmpty()) {
            return this.prepend(value);
        }
        const list = new DoublyLinkedList();
        list._size = this._size + 1;
        // Create new end node
        const newNode = {
            value,
            prev: null,
            next: null,
        };
        // Copy existing nodes
        let current = null;
        let previous = null;
        let oldCurrent = this.head;
        while (oldCurrent !== null) {
            current = {
                value: oldCurrent.value,
                prev: previous,
                next: null,
            };
            if (previous === null) {
                list.head = current;
            }
            else {
                previous.next = current;
            }
            previous = current;
            oldCurrent = oldCurrent.next;
        }
        if (current) {
            current.next = newNode;
            newNode.prev = current;
        }
        list.tail = newNode;
        return list;
    }
    /**
     * Creates a new list with the first matching element removed
     *
     * @param value - Element to remove
     * @returns A new DoublyLinkedList with the element removed
     */
    remove(value) {
        if (this.isEmpty()) {
            return this;
        }
        const list = new DoublyLinkedList();
        list._size = this._size - 1;
        let current = null;
        let previous = null;
        let found = false;
        let oldCurrent = this.head;
        while (oldCurrent !== null) {
            if (!found && oldCurrent.value === value) {
                found = true;
                oldCurrent = oldCurrent.next;
                continue;
            }
            current = {
                value: oldCurrent.value,
                prev: previous,
                next: null,
            };
            if (previous === null) {
                list.head = current;
            }
            else {
                previous.next = current;
            }
            previous = current;
            oldCurrent = oldCurrent.next;
        }
        list.tail = current;
        return found ? list : this;
    }
    /**
     * Creates a new list with elements reversed
     *
     * @returns A new DoublyLinkedList with elements in reverse order
     */
    /**
     * Creates a new list with elements reversed
     *
     * @returns A new DoublyLinkedList with elements in reverse order
     */
    reverse() {
        const list = new DoublyLinkedList();
        list._size = this._size;
        if (this.isEmpty()) {
            return list;
        }
        // Start from the tail and work backwards
        let oldCurrent = this.tail;
        let previous = null;
        while (oldCurrent) {
            const current = {
                value: oldCurrent.value,
                prev: previous,
                next: null,
            };
            if (previous === null) {
                list.head = current;
            }
            else {
                previous.next = current;
            }
            previous = current;
            oldCurrent = oldCurrent.prev;
        }
        list.tail = previous;
        return list;
    }
    /**
     * Makes the DoublyLinkedList iterable (forward direction)
     */
    *[Symbol.iterator]() {
        let current = this.head;
        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
    /**
     * Creates an iterator that moves from tail to head
     */
    reverseIterator() {
        return {
            [Symbol.iterator]: () => {
                let current = this.tail;
                return {
                    next() {
                        if (!current) {
                            return { done: true, value: undefined };
                        }
                        const value = current.value;
                        current = current.prev;
                        return { done: false, value };
                    },
                };
            },
        };
    }
    /**
     * Returns a string representation of the list
     */
    toString() {
        return [...this].join(" <-> ");
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
