/**
 * Base class for heap implementations providing common functionality.
 * This abstract class implements the core heap operations while allowing
 * subclasses to define the specific ordering through the compare method.
 *
 * @template T The type of elements in the heap
 */
export declare abstract class Heap<T> {
    /** @internal Internal storage for heap elements */
    protected elements: T[];
    /**
     * Creates a new empty heap
     */
    constructor();
    /**
     * Compares two elements to determine their order in the heap
     * @internal
     * @param a - First element
     * @param b - Second element
     * @returns negative if a should be higher in the heap, positive if b should be higher
     */
    protected abstract compare(a: T, b: T): number;
    /**
     * Returns the size of the heap
     *
     * @returns The number of elements in the heap
     */
    size(): number;
    /**
     * Checks if the heap is empty
     *
     * @returns true if the heap contains no elements
     */
    isEmpty(): boolean;
    /**
     * Returns the root element without removing it
     *
     * @returns The root element or undefined if heap is empty
     */
    peek(): T | undefined;
    /**
     * Creates a new heap with an element added
     *
     * @param element - Element to add to the heap
     * @returns A new heap containing the added element
     * @throws {TypeError} If element is null or undefined
     */
    add(element: T): Heap<T>;
    /**
     * Creates a new heap with the root element removed
     *
     * @returns Object containing the removed element and the new heap
     */
    remove(): {
        element: T | undefined;
        heap: Heap<T>;
    };
    /**
     * Creates a new heap with all elements removed
     *
     * @returns A new empty heap
     */
    clear(): Heap<T>;
    /**
     * Makes the heap iterable, yielding elements in heap order
     * Note: Iterating will effectively sort the elements
     */
    [Symbol.iterator](): Iterator<T>;
    private heapify;
    /** @internal Creates a new instance of the same heap type */
    protected abstract clone(): Heap<T>;
    /** @internal Maintains heap property by moving an element up */
    protected bubbleUp(heap: T[], index: number): void;
    /** @internal Maintains heap property by moving an element down */
    protected bubbleDown(heap: T[], index: number): void;
}
/**
 * A MinHeap implementation where the smallest element is always at the root.
 *
 * @template T The type of elements in the heap
 * @example
 * ```typescript
 * const minHeap = new MinHeap<number>();
 * const heap2 = minHeap.add(5).add(3).add(7);
 * console.log(heap2.peek()); // 3
 * ```
 */
export declare class MinHeap<T> extends Heap<T> {
    /**
     * Creates a new empty MinHeap
     */
    constructor();
    /**
     * Creates a MinHeap from an array of elements
     *
     * @param elements - Array of elements to add to the heap
     * @returns A new MinHeap containing all elements
     */
    static from<T>(elements: T[]): MinHeap<T>;
    /**
     * Creates a new MinHeap from a comparable type
     * @internal
     */
    protected clone(): MinHeap<T>;
    /**
     * Compares elements for min-heap property
     * @internal
     */
    protected compare(a: T, b: T): number;
}
/**
 * A MaxHeap implementation where the largest element is always at the root.
 *
 * @template T The type of elements in the heap
 * @example
 * ```typescript
 * const maxHeap = new MaxHeap<number>();
 * const heap2 = maxHeap.add(5).add(3).add(7);
 * console.log(heap2.peek()); // 7
 * ```
 */
export declare class MaxHeap<T> extends Heap<T> {
    /**
     * Creates a new empty MaxHeap
     */
    constructor();
    /**
     * Creates a MaxHeap from an array of elements
     *
     * @param elements - Array of elements to add to the heap
     * @returns A new MaxHeap containing all elements
     */
    static from<T>(elements: T[]): MaxHeap<T>;
    /**
     * Creates a new MaxHeap from a comparable type
     * @internal
     */
    protected clone(): MaxHeap<T>;
    /**
     * Compares elements for max-heap property
     * @internal
     */
    protected compare(a: T, b: T): number;
}
/**
 * A custom heap implementation that allows defining custom comparison logic.
 * Useful when working with complex objects or custom ordering requirements.
 *
 * @template T The type of elements in the heap
 * @example
 * ```typescript
 * interface Task {
 *   priority: number;
 *   name: string;
 * }
 *
 * const taskHeap = new CustomHeap<Task>((a, b) => a.priority - b.priority);
 * const heap2 = taskHeap.add({ priority: 1, name: 'Task 1' });
 * ```
 */
export declare class CustomHeap<T> extends Heap<T> {
    private readonly compareFn;
    h: any;
    /**
     * Creates a new empty CustomHeap with the given comparison function
     *
     * @param compareFn - Function to determine element ordering
     */
    constructor(compareFn: (a: T, b: T) => number);
    /**
     * Creates a CustomHeap from an array of elements
     *
     * @param elements - Array of elements to add to the heap
     * @param compareFn - Function to determine element ordering
     * @returns A new CustomHeap containing all elements
     */
    static from<T>(elements: T[], compareFn: (a: T, b: T) => number): CustomHeap<T>;
    /**
     * Creates a new CustomHeap with the same comparison function
     * @internal
     */
    protected clone(): CustomHeap<T>;
    /**
     * Uses the custom comparison function
     * @internal
     */
    protected compare(a: T, b: T): number;
}
/**
 * A BinaryHeap implementation that can be either min or max heap.
 * This is a more traditional implementation that matches what you might
 * find in other languages' standard libraries.
 *
 * @template T The type of elements in the heap
 * @example
 * ```typescript
 * // Create a min heap
 * const minHeap = new BinaryHeap<number>('min');
 *
 * // Create a max heap
 * const maxHeap = new BinaryHeap<number>('max');
 * ```
 */
export declare class BinaryHeap<T> extends Heap<T> {
    private readonly type;
    /**
     * Creates a new empty BinaryHeap
     *
     * @param type - Whether this should be a 'min' or 'max' heap
     */
    constructor(type?: "min" | "max");
    /**
     * Creates a BinaryHeap from an array of elements
     *
     * @param elements - Array of elements to add to the heap
     * @param type - Whether this should be a 'min' or 'max' heap
     * @returns A new BinaryHeap containing all elements
     */
    static from<T>(elements: T[], type?: "min" | "max"): BinaryHeap<T>;
    /**
     * Creates a new BinaryHeap of the same type
     * @internal
     */
    protected clone(): BinaryHeap<T>;
    /**
     * Compares elements based on heap type
     * @internal
     */
    protected compare(a: T, b: T): number;
}
