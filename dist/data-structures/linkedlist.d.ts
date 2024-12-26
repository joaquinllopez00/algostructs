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
export declare class LinkedList<T> {
    private head;
    private _size;
    /**
     * Creates a new empty LinkedList
     */
    constructor();
    /**
     * Creates a LinkedList from an array of elements
     *
     * @param elements - Array of elements to add to the list
     * @returns A new LinkedList containing all elements
     */
    static from<T>(elements: T[]): LinkedList<T>;
    /**
     * Returns the size of the list
     */
    size(): number;
    /**
     * Checks if the list is empty
     */
    isEmpty(): boolean;
    /**
     * Returns the first element in the list
     *
     * @returns The first element or undefined if empty
     */
    first(): T | undefined;
    /**
     * Creates a new list with an element added to the front
     *
     * @param value - Element to add
     * @returns A new LinkedList with the element added
     */
    prepend(value: T): LinkedList<T>;
    /**
     * Creates a new list with an element added to the end
     *
     * @param value - Element to add
     * @returns A new LinkedList with the element added
     */
    append(value: T): LinkedList<T>;
    /**
     * Creates a new list with the first matching element removed
     *
     * @param value - Element to remove
     * @returns A new LinkedList with the element removed
     */
    remove(value: T): LinkedList<T>;
    /**
     * Creates a new list with elements reversed
     *
     * @returns A new LinkedList with elements in reverse order
     */
    reverse(): LinkedList<T>;
    /**
     * Checks if a value exists in the list
     *
     * @param value - Value to search for
     * @returns true if the value is found
     */
    contains(value: T): boolean;
    /**
     * Makes the LinkedList iterable
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Returns a string representation of the list
     */
    toString(): string;
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
export declare class DoublyLinkedList<T> {
    private head;
    private tail;
    private _size;
    /**
     * Creates a new empty DoublyLinkedList
     */
    constructor();
    /**
     * Creates a DoublyLinkedList from an array of elements
     *
     * @param elements - Array of elements to add to the list
     * @returns A new DoublyLinkedList containing all elements
     */
    static from<T>(elements: T[]): DoublyLinkedList<T>;
    /**
     * Returns the size of the list
     */
    size(): number;
    /**
     * Checks if the list is empty
     */
    isEmpty(): boolean;
    /**
     * Returns the first element in the list
     */
    first(): T | undefined;
    /**
     * Returns the last element in the list
     */
    last(): T | undefined;
    /**
     * Creates a new list with an element added to the front
     *
     * @param value - Element to add
     * @returns A new DoublyLinkedList with the element added
     */
    prepend(value: T): DoublyLinkedList<T>;
    /**
     * Creates a new list with an element added to the end
     *
     * @param value - Element to add
     * @returns A new DoublyLinkedList with the element added
     */
    append(value: T): DoublyLinkedList<T>;
    /**
     * Creates a new list with the first matching element removed
     *
     * @param value - Element to remove
     * @returns A new DoublyLinkedList with the element removed
     */
    remove(value: T): DoublyLinkedList<T>;
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
    reverse(): DoublyLinkedList<T>;
    /**
     * Makes the DoublyLinkedList iterable (forward direction)
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Creates an iterator that moves from tail to head
     */
    reverseIterator(): Iterable<T>;
    /**
     * Returns a string representation of the list
     */
    toString(): string;
}
