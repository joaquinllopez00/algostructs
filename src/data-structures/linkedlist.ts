/**
 * Node interface for linked list implementations.
 * @internal
 * @template T The type of value stored in the node
 */
interface Node<T> {
  value: T;
  next: Node<T> | null;
}

/**
 * Node interface for doubly linked list implementations.
 * @internal
 * @template T The type of value stored in the node
 */
interface DoubleNode<T> extends Node<T> {
  prev: DoubleNode<T> | null;
  next: DoubleNode<T> | null;
}

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
export class LinkedList<T> {
  private head: Node<T> | null;
  private _size: number;

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
  static from<T>(elements: T[]): LinkedList<T> {
    return elements.reduce((list, element) => list.append(element), new LinkedList<T>());
  }

  /**
   * Returns the size of the list
   */
  size(): number {
    return this._size;
  }

  /**
   * Checks if the list is empty
   */
  isEmpty(): boolean {
    return this.head === null;
  }

  /**
   * Returns the first element in the list
   *
   * @returns The first element or undefined if empty
   */
  first(): T | undefined {
    return this.head?.value;
  }

  /**
   * Creates a new list with an element added to the front
   *
   * @param value - Element to add
   * @returns A new LinkedList with the element added
   */
  prepend(value: T): LinkedList<T> {
    const list = new LinkedList<T>();
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
  append(value: T): LinkedList<T> {
    if (this.isEmpty()) {
      return this.prepend(value);
    }

    const list = new LinkedList<T>();
    list._size = this._size + 1;

    // Create new nodes, preserving immutability
    const newNode = { value, next: null };
    let current: Node<T> | null = null;
    let previous: Node<T> | null = null;

    // Copy existing nodes
    let oldCurrent = this.head;
    while (oldCurrent !== null) {
      current = { value: oldCurrent.value, next: null };
      if (previous === null) {
        list.head = current;
      } else {
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
  remove(value: T): LinkedList<T> {
    if (this.isEmpty()) {
      return this;
    }

    // If removing head
    if (this.head!.value === value) {
      const list = new LinkedList<T>();
      list.head = this.head!.next;
      list._size = this._size - 1;
      return list;
    }

    const list = new LinkedList<T>();
    list._size = this._size - 1;

    let current: Node<T> | null = null;
    let previous: Node<T> | null = null;
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
      } else {
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
  reverse(): LinkedList<T> {
    const list = new LinkedList<T>();
    list._size = this._size;

    let prev: Node<T> | null = null;
    let current = this.head;

    while (current !== null) {
      const newNode: Node<T> = { value: current.value, next: prev };
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
  contains(value: T): boolean {
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
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }

  /**
   * Returns a string representation of the list
   */
  toString(): string {
    return [...this].join(" -> ");
  }
}

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
export class DoublyLinkedList<T> {
  private head: DoubleNode<T> | null;
  private tail: DoubleNode<T> | null;
  private _size: number;

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
  static from<T>(elements: T[]): DoublyLinkedList<T> {
    return elements.reduce((list, element) => list.append(element), new DoublyLinkedList<T>());
  }

  /**
   * Returns the size of the list
   */
  size(): number {
    return this._size;
  }

  /**
   * Checks if the list is empty
   */
  isEmpty(): boolean {
    return this.head === null;
  }

  /**
   * Returns the first element in the list
   */
  first(): T | undefined {
    return this.head?.value;
  }

  /**
   * Returns the last element in the list
   */
  last(): T | undefined {
    return this.tail?.value;
  }

  /**
   * Creates a new list with an element added to the front
   *
   * @param value - Element to add
   * @returns A new DoublyLinkedList with the element added
   */
  prepend(value: T): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>();
    list._size = this._size + 1;

    const newNode: DoubleNode<T> = {
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
    let current: DoubleNode<T> | null = null;
    let previous: DoubleNode<T> | null = null;

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
      } else {
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
  append(value: T): DoublyLinkedList<T> {
    if (this.isEmpty()) {
      return this.prepend(value);
    }

    const list = new DoublyLinkedList<T>();
    list._size = this._size + 1;

    // Create new end node
    const newNode: DoubleNode<T> = {
      value,
      prev: null,
      next: null,
    };

    // Copy existing nodes
    let current: DoubleNode<T> | null = null;
    let previous: DoubleNode<T> | null = null;

    let oldCurrent = this.head;
    while (oldCurrent !== null) {
      current = {
        value: oldCurrent.value,
        prev: previous,
        next: null,
      };

      if (previous === null) {
        list.head = current;
      } else {
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
  remove(value: T): DoublyLinkedList<T> {
    if (this.isEmpty()) {
      return this;
    }

    const list = new DoublyLinkedList<T>();
    list._size = this._size - 1;

    let current: DoubleNode<T> | null = null;
    let previous: DoubleNode<T> | null = null;
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
      } else {
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
  reverse(): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>();
    list._size = this._size;

    if (this.isEmpty()) {
      return list;
    }

    // Start from the tail and work backwards
    let oldCurrent = this.tail;
    let previous: DoubleNode<T> | null = null;

    while (oldCurrent) {
      const current: DoubleNode<T> = {
        value: oldCurrent.value,
        prev: previous,
        next: null,
      };

      if (previous === null) {
        list.head = current;
      } else {
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
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }

  /**
   * Creates an iterator that moves from tail to head
   */
  reverseIterator(): Iterable<T> {
    return {
      [Symbol.iterator]: () => {
        let current = this.tail;
        return {
          next(): IteratorResult<T> {
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
  toString(): string {
    return [...this].join(" <-> ");
  }
}
