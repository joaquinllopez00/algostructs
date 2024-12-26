/**
 * Type definition for comparison function
 * @template T The type of values being compared
 */
type CompareFn<T> = (a: T, b: T) => number;
/**
 * A collection of sorting algorithms with different time/space complexities
 * and characteristics. Each algorithm is implemented as a pure function
 * that returns a new sorted array.
 */
export declare class Sorting {
    /**
     * QuickSort implementation using the Hoare partition scheme.
     * Time Complexity: O(n log n) average, O(n²) worst case
     * Space Complexity: O(log n) due to recursion
     * Stable: No
     * In-place: Yes
     *
     * @template T The type of elements to sort
     * @param arr - Array to sort
     * @param compare - Optional comparison function
     * @returns A new sorted array
     * @example
     * ```typescript
     * const arr = [3, 1, 4, 1, 5, 9];
     * const sorted = Sorting.quickSort(arr);
     * console.log(sorted); // [1, 1, 3, 4, 5, 9]
     * ```
     */
    static quickSort<T>(arr: T[], compare?: CompareFn<T>): T[];
    /**
     * MergeSort implementation.
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     * Stable: Yes
     * In-place: No
     *
     * @template T The type of elements to sort
     * @param arr - Array to sort
     * @param compare - Optional comparison function
     * @returns A new sorted array
     * @example
     * ```typescript
     * const arr = [3, 1, 4, 1, 5, 9];
     * const sorted = Sorting.mergeSort(arr);
     * // Preserves relative order of equal elements
     * ```
     */
    static mergeSort<T>(arr: T[], compare?: CompareFn<T>): T[];
    /**
     * HeapSort implementation.
     * Time Complexity: O(n log n)
     * Space Complexity: O(1)
     * Stable: No
     * In-place: Yes
     *
     * @template T The type of elements to sort
     * @param arr - Array to sort
     * @param compare - Optional comparison function
     * @returns A new sorted array
     * @example
     * ```typescript
     * const arr = [3, 1, 4, 1, 5, 9];
     * const sorted = Sorting.heapSort(arr);
     * ```
     */
    static heapSort<T>(arr: T[], compare?: CompareFn<T>): T[];
    /**
     * InsertionSort implementation. Efficient for small arrays and nearly sorted arrays.
     * Time Complexity: O(n²) worst/average case, O(n) best case
     * Space Complexity: O(1)
     * Stable: Yes
     * In-place: Yes
     *
     * @template T The type of elements to sort
     * @param arr - Array to sort
     * @param compare - Optional comparison function
     * @returns A new sorted array
     * @example
     * ```typescript
     * const arr = [3, 1, 4, 1, 5, 9];
     * const sorted = Sorting.insertionSort(arr);
     * ```
     */
    static insertionSort<T>(arr: T[], compare?: CompareFn<T>): T[];
    /**
     * CountingSort implementation for arrays of integers.
     * Time Complexity: O(n + k) where k is the range of input
     * Space Complexity: O(k)
     * Stable: Yes
     * In-place: No
     * Note: Only works with non-negative integers
     *
     * @param arr - Array of non-negative integers to sort
     * @returns A new sorted array
     * @throws {Error} If array contains negative numbers
     * @example
     * ```typescript
     * const arr = [3, 1, 4, 1, 5, 9];
     * const sorted = Sorting.countingSort(arr);
     * ```
     */
    static countingSort(arr: number[]): number[];
    /**
     * Hybrid sort that chooses the best algorithm based on input characteristics.
     * - Uses insertion sort for small arrays (length <= 10)
     * - Uses quicksort for larger arrays
     *
     * @template T The type of elements to sort
     * @param arr - Array to sort
     * @param compare - Optional comparison function
     * @returns A new sorted array
     */
    static sort<T>(arr: T[], compare?: CompareFn<T>): T[];
    /**
     * Checks if an array is sorted according to a comparison function
     *
     * @template T The type of elements to check
     * @param arr - Array to check
     * @param compare - Optional comparison function
     * @returns true if the array is sorted
     */
    static isSorted<T>(arr: T[], compare?: CompareFn<T>): boolean;
}
export {};
