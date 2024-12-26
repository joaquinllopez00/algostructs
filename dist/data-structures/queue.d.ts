/**
 * Type definition for comparison function used in PriorityQueue
 * Returns negative if a < b, positive if a > b, and 0 if equal
 * @template T The type of elements in the queue
 */
type CompareFn<T> = (a: T, b: T) => number;
/**
 * An immutable Priority Queue implementation using a binary heap.
 * All operations that modify the queue return a new instance.
 *
 * @template T The type of elements in the queue
 * @example
 * ```typescript
 * // Create a min heap of numbers
 * const pq = new PriorityQueue<number>();
 * const pq2 = pq.enqueue(5).enqueue(2).enqueue(8);
 *
 * // Create a max heap
 * const maxPq = new PriorityQueue<number>((a, b) => b - a);
 * ```
 */
/**
 * A double-ended queue (deque) implementation that allows adding and removing
 * elements from both ends efficiently.
 *
 * @template T The type of elements in the deque
 * @example
 * ```typescript
 * const deque = new Deque<number>();
 * const d2 = deque.pushFront(1).pushBack(2);
 * ```
 */
export declare class Deque<T> {
    private readonly elements;
    /**
     * Creates a new empty Deque
     */
    constructor();
    /**
     * Creates a new Deque with the given elements
     *
     * @param elements - Array of elements to initialize the deque with
     * @returns A new Deque containing all elements
     */
    static from<T>(elements: T[]): Deque<T>;
    /**
     * Adds elements to the front of the deque
     *
     * @param items - Elements to add to the front
     * @returns A new Deque with the elements added
     */
    pushFront(...items: T[]): Deque<T>;
    /**
     * Adds elements to the back of the deque
     *
     * @param items - Elements to add to the back
     * @returns A new Deque with the elements added
     */
    pushBack(...items: T[]): Deque<T>;
    /**
     * Removes and returns the front element
     *
     * @returns An object containing the removed element and the new deque
     */
    popFront(): {
        element: T | undefined;
        deque: Deque<T>;
    };
    /**
     * Removes and returns the back element
     *
     * @returns An object containing the removed element and the new deque
     */
    popBack(): {
        element: T | undefined;
        deque: Deque<T>;
    };
    /**
     * Returns the front element without removing it
     */
    peekFront(): T | undefined;
    /**
     * Returns the back element without removing it
     */
    peekBack(): T | undefined;
    /**
     * Returns true if the deque is empty
     */
    isEmpty(): boolean;
    /**
     * Returns the number of elements in the deque
     */
    size(): number;
    /**
     * Makes the Deque iterable, yielding elements from front to back
     */
    [Symbol.iterator](): Iterator<T>;
}
/**
 * A circular queue implementation with a fixed size that wraps around.
 * Useful for implementing buffers with a fixed size where older elements
 * are automatically removed when capacity is reached.
 *
 * @template T The type of elements in the queue
 * @example
 * ```typescript
 * const queue = new CircularQueue<number>(3);
 * const q2 = queue.enqueue(1).enqueue(2).enqueue(3).enqueue(4); // 4 replaces 1
 * ```
 */
export declare class CircularQueue<T> {
    private readonly elements;
    private readonly capacity;
    /**
     * Creates a new empty CircularQueue with the given capacity
     *
     * @param capacity - Maximum number of elements the queue can hold
     * @throws {Error} If capacity is less than 1
     */
    constructor(capacity: number);
    /**
     * Adds an element to the queue, removing the oldest element if at capacity
     *
     * @param element - Element to add
     * @returns A new CircularQueue with the element added
     */
    enqueue(element: T): CircularQueue<T>;
    /**
     * Removes and returns the oldest element
     *
     * @returns An object containing the removed element and the new queue
     */
    dequeue(): {
        element: T | undefined;
        queue: CircularQueue<T>;
    };
    /**
     * Returns true if the queue is empty
     */
    isEmpty(): boolean;
    /**
     * Returns true if the queue is at capacity
     */
    isFull(): boolean;
    /**
     * Returns the number of elements in the queue
     */
    size(): number;
    /**
     * Returns the maximum capacity of the queue
     */
    getCapacity(): number;
    /**
     * Makes the CircularQueue iterable, yielding elements from oldest to newest
     */
    [Symbol.iterator](): Iterator<T>;
}
/**
 * A convenience class for a max-heap priority queue.
 * Internally uses PriorityQueue with a reversed comparison function.
 *
 * @template T The type of elements in the queue
 * @example
 * ```typescript
 * const maxPQ = new MaxPriorityQueue<number>();
 * const pq2 = maxPQ.enqueue(5).enqueue(2).enqueue(8); // 8 will be at the top
 * ```
 */
export declare class MaxPriorityQueue<T> {
    private queue;
    /**
     * Creates a new empty MaxPriorityQueue
     *
     * @param compare - Optional comparison function
     */
    constructor(compare?: CompareFn<T>);
    /**
     * Creates a new MaxPriorityQueue from an array of elements
     */
    static from<T>(elements: T[], compare?: CompareFn<T>): MaxPriorityQueue<T>;
    enqueue(element: T): MaxPriorityQueue<T>;
    dequeue(): {
        element: T | undefined;
        queue: MaxPriorityQueue<T>;
    };
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    [Symbol.iterator](): Iterator<T>;
}
export declare class PriorityQueue<T> {
    /** @internal Internal heap storage */
    private readonly heap;
    /** @internal Comparison function */
    private readonly compare;
    /**
     * Creates a new empty PriorityQueue
     *
     * @param compare - Optional comparison function. Defaults to (a, b) => a - b for numbers
     * @throws {TypeError} If compare is not a function when provided
     *
     * @example
     * ```typescript
     * // Min heap (default)
     * const minHeap = new PriorityQueue<number>();
     *
     * // Max heap
     * const maxHeap = new PriorityQueue<number>((a, b) => b - a);
     *
     * // Custom comparison
     * const customHeap = new PriorityQueue<Task>((a, b) => a.priority - b.priority);
     * ```
     */
    constructor(compare?: CompareFn<T>);
    /**
     * Creates a new PriorityQueue from an array of elements
     *
     * @param elements - Array of elements to initialize the queue with
     * @param compare - Optional comparison function
     * @returns A new PriorityQueue containing all elements
     * @throws {TypeError} If elements is not an array
     *
     * @example
     * ```typescript
     * const pq = PriorityQueue.from([5, 2, 8, 1, 9]);
     * ```
     */
    static from<T>(elements: T[], compare?: CompareFn<T>): PriorityQueue<T>;
    /**
     * Adds an element to the queue
     *
     * @param element - Element to add to the queue
     * @returns A new PriorityQueue containing the new element
     * @throws {TypeError} If element is undefined or null
     *
     * @example
     * ```typescript
     * const pq1 = new PriorityQueue<number>();
     * const pq2 = pq1.enqueue(5);
     * ```
     */
    enqueue(element: T): PriorityQueue<T>;
    /**
     * Removes and returns the highest priority element
     *
     * @returns An object containing the removed element and the new queue
     * @property {T | undefined} element - The removed element, or undefined if queue was empty
     * @property {PriorityQueue<T>} queue - The new queue without the element
     *
     * @example
     * ```typescript
     * const pq1 = PriorityQueue.from([5, 2, 8]);
     * const { element, queue: pq2 } = pq1.dequeue();
     * console.log(element); // 2 (assuming min heap)
     * ```
     */
    dequeue(): {
        element: T | undefined;
        queue: PriorityQueue<T>;
    };
    /**
     * Returns the highest priority element without removing it
     *
     * @returns The highest priority element, or undefined if queue is empty
     *
     * @example
     * ```typescript
     * const pq = PriorityQueue.from([5, 2, 8]);
     * console.log(pq.peek()); // 2 (assuming min heap)
     * ```
     */
    peek(): T | undefined;
    /**
     * Checks if the queue is empty
     *
     * @returns true if the queue is empty, false otherwise
     */
    isEmpty(): boolean;
    /**
     * Returns the number of elements in the queue
     *
     * @returns The number of elements in the queue
     */
    size(): number;
    /**
     * Returns a new empty PriorityQueue with the same comparison function
     *
     * @returns A new empty PriorityQueue
     */
    clear(): PriorityQueue<T>;
    /**
     * Internal method to maintain heap property while inserting
     *
     * @internal
     * @param heap - The heap array
     * @param index - The index of the element to bubble up
     */
    private bubbleUp;
    /**
     * Internal method to maintain heap property while removing
     *
     * @internal
     * @param heap - The heap array
     * @param index - The index of the element to bubble down
     */
    private bubbleDown;
    /**
     * Makes the PriorityQueue iterable, yielding elements in priority order
     * Note: Iterating consumes the queue
     *
     * @returns An iterator of the elements in priority order
     *
     * @example
     * ```typescript
     * const pq = PriorityQueue.from([5, 2, 8]);
     * for (const element of pq) {
     *   console.log(element); // Will print elements in priority order
     * }
     * ```
     */
    [Symbol.iterator](): Iterator<T>;
}
export {};
