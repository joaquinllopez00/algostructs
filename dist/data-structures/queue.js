"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = exports.MaxPriorityQueue = exports.CircularQueue = exports.Deque = void 0;
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
class Deque {
    /**
     * Creates a new empty Deque
     */
    constructor() {
        this.elements = [];
    }
    /**
     * Creates a new Deque with the given elements
     *
     * @param elements - Array of elements to initialize the deque with
     * @returns A new Deque containing all elements
     */
    static from(elements) {
        const deque = new Deque();
        return new Deque().pushBack(...elements);
    }
    /**
     * Adds elements to the front of the deque
     *
     * @param items - Elements to add to the front
     * @returns A new Deque with the elements added
     */
    pushFront(...items) {
        const newDeque = new Deque();
        newDeque.elements.push(...items, ...this.elements);
        return newDeque;
    }
    /**
     * Adds elements to the back of the deque
     *
     * @param items - Elements to add to the back
     * @returns A new Deque with the elements added
     */
    pushBack(...items) {
        const newDeque = new Deque();
        newDeque.elements.push(...this.elements, ...items);
        return newDeque;
    }
    /**
     * Removes and returns the front element
     *
     * @returns An object containing the removed element and the new deque
     */
    popFront() {
        if (this.isEmpty()) {
            return { element: undefined, deque: new Deque() };
        }
        const [element, ...rest] = this.elements;
        const newDeque = new Deque();
        newDeque.elements.push(...rest);
        return { element, deque: newDeque };
    }
    /**
     * Removes and returns the back element
     *
     * @returns An object containing the removed element and the new deque
     */
    popBack() {
        if (this.isEmpty()) {
            return { element: undefined, deque: new Deque() };
        }
        const element = this.elements[this.elements.length - 1];
        const newDeque = new Deque();
        newDeque.elements.push(...this.elements.slice(0, -1));
        return { element, deque: newDeque };
    }
    /**
     * Returns the front element without removing it
     */
    peekFront() {
        return this.elements[0];
    }
    /**
     * Returns the back element without removing it
     */
    peekBack() {
        return this.elements[this.elements.length - 1];
    }
    /**
     * Returns true if the deque is empty
     */
    isEmpty() {
        return this.elements.length === 0;
    }
    /**
     * Returns the number of elements in the deque
     */
    size() {
        return this.elements.length;
    }
    /**
     * Makes the Deque iterable, yielding elements from front to back
     */
    *[Symbol.iterator]() {
        yield* this.elements;
    }
}
exports.Deque = Deque;
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
class CircularQueue {
    /**
     * Creates a new empty CircularQueue with the given capacity
     *
     * @param capacity - Maximum number of elements the queue can hold
     * @throws {Error} If capacity is less than 1
     */
    constructor(capacity) {
        if (capacity < 1) {
            throw new Error("Capacity must be at least 1");
        }
        this.elements = [];
        this.capacity = capacity;
    }
    /**
     * Adds an element to the queue, removing the oldest element if at capacity
     *
     * @param element - Element to add
     * @returns A new CircularQueue with the element added
     */
    enqueue(element) {
        const newQueue = new CircularQueue(this.capacity);
        const newElements = [...this.elements];
        if (newElements.length === this.capacity) {
            newElements.shift();
        }
        newElements.push(element);
        newQueue.elements.push(...newElements);
        return newQueue;
    }
    /**
     * Removes and returns the oldest element
     *
     * @returns An object containing the removed element and the new queue
     */
    dequeue() {
        if (this.isEmpty()) {
            return { element: undefined, queue: new CircularQueue(this.capacity) };
        }
        const [element, ...rest] = this.elements;
        const newQueue = new CircularQueue(this.capacity);
        newQueue.elements.push(...rest);
        return { element, queue: newQueue };
    }
    /**
     * Returns true if the queue is empty
     */
    isEmpty() {
        return this.elements.length === 0;
    }
    /**
     * Returns true if the queue is at capacity
     */
    isFull() {
        return this.elements.length === this.capacity;
    }
    /**
     * Returns the number of elements in the queue
     */
    size() {
        return this.elements.length;
    }
    /**
     * Returns the maximum capacity of the queue
     */
    getCapacity() {
        return this.capacity;
    }
    /**
     * Makes the CircularQueue iterable, yielding elements from oldest to newest
     */
    *[Symbol.iterator]() {
        yield* this.elements;
    }
}
exports.CircularQueue = CircularQueue;
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
class MaxPriorityQueue {
    /**
     * Creates a new empty MaxPriorityQueue
     *
     * @param compare - Optional comparison function
     */
    constructor(compare = (a, b) => a - b) {
        this.queue = new PriorityQueue((a, b) => -compare(a, b));
    }
    /**
     * Creates a new MaxPriorityQueue from an array of elements
     */
    static from(elements, compare) {
        return elements.reduce((queue, element) => queue.enqueue(element), new MaxPriorityQueue(compare));
    }
    // Delegate all operations to the internal queue
    enqueue(element) {
        const newQueue = this.queue.enqueue(element);
        const result = new MaxPriorityQueue();
        result.queue = newQueue;
        return result;
    }
    dequeue() {
        const { element, queue } = this.queue.dequeue();
        const result = new MaxPriorityQueue();
        result.queue = queue;
        return { element, queue: result };
    }
    peek() {
        return this.queue.peek();
    }
    isEmpty() {
        return this.queue.isEmpty();
    }
    size() {
        return this.queue.size();
    }
    *[Symbol.iterator]() {
        yield* this.queue;
    }
}
exports.MaxPriorityQueue = MaxPriorityQueue;
class PriorityQueue {
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
    constructor(compare = (a, b) => a - b) {
        if (compare && typeof compare !== "function") {
            throw new TypeError("Comparison function must be a function");
        }
        this.heap = [];
        this.compare = compare;
    }
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
    static from(elements, compare) {
        if (!Array.isArray(elements)) {
            throw new TypeError("Elements must be an array");
        }
        return elements.reduce((queue, element) => queue.enqueue(element), new PriorityQueue(compare));
    }
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
    enqueue(element) {
        if (element === undefined || element === null) {
            throw new TypeError("Element cannot be null or undefined");
        }
        const newHeap = [...this.heap, element];
        const newPQ = new PriorityQueue(this.compare);
        newPQ.heap.push(...newHeap);
        this.bubbleUp(newPQ.heap, newPQ.heap.length - 1);
        return newPQ;
    }
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
    dequeue() {
        if (this.heap.length === 0) {
            return { element: undefined, queue: new PriorityQueue(this.compare) };
        }
        const newHeap = [...this.heap];
        const element = newHeap[0];
        newHeap[0] = newHeap[newHeap.length - 1];
        newHeap.pop();
        const newPQ = new PriorityQueue(this.compare);
        newPQ.heap.push(...newHeap);
        if (newPQ.heap.length > 0) {
            this.bubbleDown(newPQ.heap, 0);
        }
        return { element, queue: newPQ };
    }
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
    peek() {
        return this.heap[0];
    }
    /**
     * Checks if the queue is empty
     *
     * @returns true if the queue is empty, false otherwise
     */
    isEmpty() {
        return this.heap.length === 0;
    }
    /**
     * Returns the number of elements in the queue
     *
     * @returns The number of elements in the queue
     */
    size() {
        return this.heap.length;
    }
    /**
     * Returns a new empty PriorityQueue with the same comparison function
     *
     * @returns A new empty PriorityQueue
     */
    clear() {
        return new PriorityQueue(this.compare);
    }
    /**
     * Internal method to maintain heap property while inserting
     *
     * @internal
     * @param heap - The heap array
     * @param index - The index of the element to bubble up
     */
    bubbleUp(heap, index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(heap[parentIndex], heap[index]) <= 0) {
                break;
            }
            [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
            index = parentIndex;
        }
    }
    /**
     * Internal method to maintain heap property while removing
     *
     * @internal
     * @param heap - The heap array
     * @param index - The index of the element to bubble down
     */
    bubbleDown(heap, index) {
        const length = heap.length;
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            if (leftChild < length && this.compare(heap[leftChild], heap[smallest]) < 0) {
                smallest = leftChild;
            }
            if (rightChild < length && this.compare(heap[rightChild], heap[smallest]) < 0) {
                smallest = rightChild;
            }
            if (smallest === index) {
                break;
            }
            [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
            index = smallest;
        }
    }
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
    *[Symbol.iterator]() {
        let current = new PriorityQueue(this.compare);
        current.heap.push(...this.heap);
        while (!current.isEmpty()) {
            const { element, queue } = current.dequeue();
            if (element !== undefined) {
                yield element;
                current = queue;
            }
        }
    }
}
exports.PriorityQueue = PriorityQueue;
