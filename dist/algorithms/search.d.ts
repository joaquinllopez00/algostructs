/**
 * Type definition for comparison function
 * @template T The type of values being compared
 */
type CompareFn<T> = (a: T, b: T) => number;
/**
 * Result interface for search operations
 * @template T The type of elements being searched
 */
interface SearchResult<T> {
    /** The found element or undefined if not found */
    element: T | undefined;
    /** The index where the element was found (-1 if not found) */
    index: number;
    /** Number of comparisons made during search */
    comparisons: number;
}
/**
 * A collection of searching algorithms with different time complexities
 * and characteristics. Each algorithm returns detailed search results
 * including the found element, index, and number of comparisons made.
 */
export declare class Searching {
    /**
     * Binary Search implementation.
     * Requires a sorted array.
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     *
     * @template T The type of elements to search
     * @param arr - Sorted array to search in
     * @param target - Element to find
     * @param compare - Optional comparison function
     * @returns SearchResult with found element, index, and comparison count
     * @throws {Error} If array is not sorted
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 4, 5];
     * const result = Searching.binarySearch(arr, 3);
     * console.log(result); // { element: 3, index: 2, comparisons: 2 }
     * ```
     */
    static binarySearch<T>(arr: T[], target: T, compare?: CompareFn<T>): SearchResult<T>;
    /**
     * Linear Search implementation.
     * Works on unsorted arrays.
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     *
     * @template T The type of elements to search
     * @param arr - Array to search in
     * @param target - Element to find
     * @param compare - Optional comparison function
     * @returns SearchResult with found element, index, and comparison count
     * @example
     * ```typescript
     * const arr = [4, 2, 7, 1, 9];
     * const result = Searching.linearSearch(arr, 7);
     * ```
     */
    static linearSearch<T>(arr: T[], target: T, compare?: CompareFn<T>): SearchResult<T>;
    /**
     * Jump Search implementation.
     * Requires a sorted array.
     * Time Complexity: O(√n)
     * Space Complexity: O(1)
     *
     * @template T The type of elements to search
     * @param arr - Sorted array to search in
     * @param target - Element to find
     * @param compare - Optional comparison function
     * @returns SearchResult with found element, index, and comparison count
     * @throws {Error} If array is not sorted
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
     * const result = Searching.jumpSearch(arr, 6);
     * ```
     */
    static jumpSearch<T>(arr: T[], target: T, compare?: CompareFn<T>): SearchResult<T>;
    /**
     * Interpolation Search implementation.
     * Best for uniformly distributed sorted arrays.
     * Time Complexity: O(log log n) average case, O(n) worst case
     * Space Complexity: O(1)
     *
     * @template T The type of elements to search
     * @param arr - Sorted array of numbers to search in
     * @param target - Number to find
     * @returns SearchResult with found element, index, and comparison count
     * @throws {Error} If array elements are not numbers
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
     * const result = Searching.interpolationSearch(arr, 6);
     * ```
     */
    static interpolationSearch(arr: number[], target: number): SearchResult<number>;
    /**
     * Exponential Search implementation.
     * Good for unbounded/infinite arrays.
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     *
     * @template T The type of elements to search
     * @param arr - Sorted array to search in
     * @param target - Element to find
     * @param compare - Optional comparison function
     * @returns SearchResult with found element, index, and comparison count
     * @example
     * ```typescript
     * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
     * const result = Searching.exponentialSearch(arr, 6);
     * ```
     */
    static exponentialSearch<T>(arr: T[], target: T, compare?: CompareFn<T>): SearchResult<T>;
    /**
     * Smart search that chooses the best algorithm based on input characteristics.
     * - Uses linear search for small arrays (length <= 10)
     * - Uses interpolation search for uniform numeric data
     * - Uses binary search for sorted data
     * - Falls back to linear search for unsorted data
     *
     * @template T The type of elements to search
     * @param arr - Array to search in
     * @param target - Element to find
     * @param compare - Optional comparison function
     * @returns SearchResult with found element, index, and comparison count
     */
    static search<T>(arr: T[], target: T, compare?: CompareFn<T>): SearchResult<T>;
    /**
     * Helper method to check if numeric data is uniformly distributed
     * @internal
     */
    private static isUniformlyDistributed;
}
export {};
