/**
 * Base class for heap implementations providing common functionality.
 * This abstract class implements the core heap operations while allowing
 * subclasses to define the specific ordering through the compare method.
 *
 * @template T The type of elements in the heap
 */
export abstract class Heap<T> {
  /** @internal Internal storage for heap elements */
  protected elements: T[];

  /**
   * Creates a new empty heap
   */
  constructor() {
    this.elements = [];
  }

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
  size(): number {
    return this.elements.length;
  }

  /**
   * Checks if the heap is empty
   *
   * @returns true if the heap contains no elements
   */
  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  /**
   * Returns the root element without removing it
   *
   * @returns The root element or undefined if heap is empty
   */
  peek(): T | undefined {
    return this.elements[0];
  }

  /**
   * Creates a new heap with an element added
   *
   * @param element - Element to add to the heap
   * @returns A new heap containing the added element
   * @throws {TypeError} If element is null or undefined
   */
  add(element: T): Heap<T> {
    if (element === null || element === undefined) {
      throw new TypeError("Element cannot be null or undefined");
    }

    const newHeap = this.clone();
    newHeap.elements.push(element);
    this.bubbleUp(newHeap.elements, newHeap.elements.length - 1);
    return newHeap;
  }

  /**
   * Creates a new heap with the root element removed
   *
   * @returns Object containing the removed element and the new heap
   */
  remove(): { element: T | undefined; heap: Heap<T> } {
    if (this.isEmpty()) {
      return { element: undefined, heap: this.clone() };
    }

    const newHeap = this.clone();
    const element = newHeap.elements[0];
    newHeap.elements[0] = newHeap.elements[newHeap.elements.length - 1];
    newHeap.elements.pop();

    if (newHeap.elements.length > 0) {
      this.bubbleDown(newHeap.elements, 0);
    }

    return { element, heap: newHeap };
  }

  /**
   * Creates a new heap with all elements removed
   *
   * @returns A new empty heap
   */
  clear(): Heap<T> {
    return this.clone();
  }

  /**
   * Makes the heap iterable, yielding elements in heap order
   * Note: Iterating will effectively sort the elements
   */
  *[Symbol.iterator](): Iterator<T> {
    // Make a shallow copy of elements
    const elements = [...this.elements];
    const size = elements.length;

    // Now perform heapsort in-place
    for (let i = size - 1; i > 0; i--) {
      [elements[0], elements[i]] = [elements[i], elements[0]];
      // Heapify the reduced heap
      this.heapify(elements, 0, i);
    }

    // Yield the sorted elements
    yield* elements.reverse();
  }

  private heapify(arr: T[], i: number, size: number): void {
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < size && this.compare(arr[left], arr[smallest]) < 0) {
        smallest = left;
      }
      if (right < size && this.compare(arr[right], arr[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === i) break;

      [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
      i = smallest;
    }
  }

  /** @internal Creates a new instance of the same heap type */
  protected abstract clone(): Heap<T>;

  /** @internal Maintains heap property by moving an element up */
  protected bubbleUp(heap: T[], index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(heap[parentIndex], heap[index]) <= 0) {
        break;
      }
      [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
      index = parentIndex;
    }
  }

  /** @internal Maintains heap property by moving an element down */
  protected bubbleDown(heap: T[], index: number): void {
    const length = heap.length;

    while (true) {
      let minIndex = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < length && this.compare(heap[leftChild], heap[minIndex]) < 0) {
        minIndex = leftChild;
      }

      if (rightChild < length && this.compare(heap[rightChild], heap[minIndex]) < 0) {
        minIndex = rightChild;
      }

      if (minIndex === index) {
        break;
      }

      [heap[index], heap[minIndex]] = [heap[minIndex], heap[index]];
      index = minIndex;
    }
  }
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
export class MinHeap<T> extends Heap<T> {
  /**
   * Creates a new empty MinHeap
   */
  constructor() {
    super();
  }

  /**
   * Creates a MinHeap from an array of elements
   *
   * @param elements - Array of elements to add to the heap
   * @returns A new MinHeap containing all elements
   */
  static from<T>(elements: T[]): MinHeap<T> {
    if (!Array.isArray(elements)) {
      throw new TypeError("Elements must be an array");
    }
    const heap = new MinHeap<T>();
    heap.elements = [...elements];

    // Heapify the array
    for (let i = Math.floor(heap.elements.length / 2) - 1; i >= 0; i--) {
      heap.bubbleDown(heap.elements, i);
    }
    return heap;
  }
  /**
   * Creates a new MinHeap from a comparable type
   * @internal
   */
  protected clone(): MinHeap<T> {
    const newHeap = new MinHeap<T>();
    newHeap.elements.push(...this.elements);
    return newHeap;
  }

  /**
   * Compares elements for min-heap property
   * @internal
   */
  protected compare(a: T, b: T): number {
    return (a as any) - (b as any);
  }
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
export class MaxHeap<T> extends Heap<T> {
  /**
   * Creates a new empty MaxHeap
   */
  constructor() {
    super();
  }

  /**
   * Creates a MaxHeap from an array of elements
   *
   * @param elements - Array of elements to add to the heap
   * @returns A new MaxHeap containing all elements
   */
  static from<T>(elements: T[]): MaxHeap<T> {
    if (!Array.isArray(elements)) {
      throw new TypeError("Elements must be an array");
    }
    const heap = new MaxHeap<T>();
    heap.elements = [...elements];

    // Heapify the array
    for (let i = Math.floor(heap.elements.length / 2) - 1; i >= 0; i--) {
      heap.bubbleDown(heap.elements, i);
    }
    return heap;
  }

  /**
   * Creates a new MaxHeap from a comparable type
   * @internal
   */
  protected clone(): MaxHeap<T> {
    const newHeap = new MaxHeap<T>();
    newHeap.elements.push(...this.elements);
    return newHeap;
  }

  /**
   * Compares elements for max-heap property
   * @internal
   */
  protected compare(a: T, b: T): number {
    return (b as any) - (a as any);
  }
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
export class CustomHeap<T> extends Heap<T> {
  private readonly compareFn: (a: T, b: T) => number;
  h: any;

  /**
   * Creates a new empty CustomHeap with the given comparison function
   *
   * @param compareFn - Function to determine element ordering
   */
  constructor(compareFn: (a: T, b: T) => number) {
    super();
    this.compareFn = compareFn;
  }

  /**
   * Creates a CustomHeap from an array of elements
   *
   * @param elements - Array of elements to add to the heap
   * @param compareFn - Function to determine element ordering
   * @returns A new CustomHeap containing all elements
   */
  static from<T>(elements: T[], compareFn: (a: T, b: T) => number): CustomHeap<T> {
    if (!Array.isArray(elements)) {
      throw new TypeError("Elements must be an array");
    }
    const heap = new CustomHeap<T>(compareFn);
    heap.elements = [...elements];

    // Heapify the array
    for (let i = Math.floor(heap.elements.length / 2) - 1; i >= 0; i--) {
      heap.bubbleDown(heap.elements, i);
    }
    return heap;
  }

  /**
   * Creates a new CustomHeap with the same comparison function
   * @internal
   */
  protected clone(): CustomHeap<T> {
    const newHeap = new CustomHeap<T>(this.compareFn);
    newHeap.elements.push(...this.elements);
    return newHeap;
  }

  /**
   * Uses the custom comparison function
   * @internal
   */
  protected compare(a: T, b: T): number {
    return this.compareFn(a, b);
  }
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
export class BinaryHeap<T> extends Heap<T> {
  private readonly type: "min" | "max";

  /**
   * Creates a new empty BinaryHeap
   *
   * @param type - Whether this should be a 'min' or 'max' heap
   */
  constructor(type: "min" | "max" = "min") {
    super();
    this.type = type;
  }

  /**
   * Creates a BinaryHeap from an array of elements
   *
   * @param elements - Array of elements to add to the heap
   * @param type - Whether this should be a 'min' or 'max' heap
   * @returns A new BinaryHeap containing all elements
   */
  static from<T>(elements: T[], type: "min" | "max" = "min"): BinaryHeap<T> {
    if (!Array.isArray(elements)) {
      throw new TypeError("Elements must be an array");
    }
    const heap = new BinaryHeap<T>(type);
    heap.elements = [...elements];

    // Heapify the array
    for (let i = Math.floor(heap.elements.length / 2) - 1; i >= 0; i--) {
      heap.bubbleDown(heap.elements, i);
    }
    return heap;
  }

  /**
   * Creates a new BinaryHeap of the same type
   * @internal
   */
  protected clone(): BinaryHeap<T> {
    const newHeap = new BinaryHeap<T>(this.type);
    newHeap.elements.push(...this.elements);
    return newHeap;
  }

  /**
   * Compares elements based on heap type
   * @internal
   */
  protected compare(a: T, b: T): number {
    const diff = (a as any) - (b as any);
    return this.type === "min" ? diff : -diff;
  }
}
