"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Searching = void 0;
/**
 * A collection of searching algorithms with different time complexities
 * and characteristics. Each algorithm returns detailed search results
 * including the found element, index, and number of comparisons made.
 */
class Searching {
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
    static binarySearch(arr, target, compare = (a, b) => a - b) {
        let comparisons = 0;
        let left = 0;
        let right = arr.length - 1;
        // Verify array is sorted
        for (let i = 1; i < arr.length; i++) {
            if (compare(arr[i - 1], arr[i]) > 0) {
                throw new Error("Array must be sorted for binary search");
            }
        }
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            comparisons++;
            const comparison = compare(arr[mid], target);
            if (comparison === 0) {
                return { element: arr[mid], index: mid, comparisons };
            }
            if (comparison < 0) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        return { element: undefined, index: -1, comparisons };
    }
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
    static linearSearch(arr, target, compare = (a, b) => a - b) {
        let comparisons = 0;
        for (let i = 0; i < arr.length; i++) {
            comparisons++;
            if (compare(arr[i], target) === 0) {
                return { element: arr[i], index: i, comparisons };
            }
        }
        return { element: undefined, index: -1, comparisons };
    }
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
    static jumpSearch(arr, target, compare = (a, b) => a - b) {
        let comparisons = 0;
        const n = arr.length;
        let step = Math.floor(Math.sqrt(n));
        // Verify array is sorted
        for (let i = 1; i < arr.length; i++) {
            if (compare(arr[i - 1], arr[i]) > 0) {
                throw new Error("Array must be sorted for jump search");
            }
        }
        // Finding the block where element may be present
        let prev = 0;
        while (compare(arr[Math.min(step, n) - 1], target) < 0) {
            comparisons++;
            prev = step;
            step += Math.floor(Math.sqrt(n));
            if (prev >= n) {
                return { element: undefined, index: -1, comparisons };
            }
        }
        // Linear search in the identified block
        while (compare(arr[prev], target) < 0) {
            comparisons++;
            prev++;
            if (prev === Math.min(step, n)) {
                return { element: undefined, index: -1, comparisons };
            }
        }
        comparisons++;
        if (compare(arr[prev], target) === 0) {
            return { element: arr[prev], index: prev, comparisons };
        }
        return { element: undefined, index: -1, comparisons };
    }
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
    static interpolationSearch(arr, target) {
        let comparisons = 0;
        let low = 0;
        let high = arr.length - 1;
        while (low <= high && target >= arr[low] && target <= arr[high]) {
            comparisons++;
            if (low === high) {
                if (arr[low] === target) {
                    return { element: arr[low], index: low, comparisons };
                }
                return { element: undefined, index: -1, comparisons };
            }
            // Interpolation formula
            const pos = low + Math.floor(((high - low) * (target - arr[low])) / (arr[high] - arr[low]));
            if (arr[pos] === target) {
                return { element: arr[pos], index: pos, comparisons };
            }
            if (arr[pos] < target) {
                low = pos + 1;
            }
            else {
                high = pos - 1;
            }
        }
        return { element: undefined, index: -1, comparisons };
    }
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
    static exponentialSearch(arr, target, compare = (a, b) => a - b) {
        let comparisons = 0;
        if (arr.length === 0) {
            return { element: undefined, index: -1, comparisons };
        }
        comparisons++;
        if (compare(arr[0], target) === 0) {
            return { element: arr[0], index: 0, comparisons };
        }
        // Find range for binary search
        let i = 1;
        while (i < arr.length && compare(arr[i], target) <= 0) {
            comparisons++;
            i *= 2;
        }
        // Perform binary search in the range [i/2, min(i, n-1)]
        const result = Searching.binarySearch(arr.slice(i / 2, Math.min(i, arr.length)), target, compare);
        return {
            element: result.element,
            index: result.element !== undefined ? i / 2 + result.index : -1,
            comparisons: comparisons + result.comparisons,
        };
    }
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
    static search(arr, target, compare = (a, b) => a - b) {
        // For small arrays, linear search is faster
        if (arr.length <= 10) {
            return this.linearSearch(arr, target, compare);
        }
        // Check if array is sorted
        let isSorted = true;
        for (let i = 1; i < arr.length; i++) {
            if (compare(arr[i - 1], arr[i]) > 0) {
                isSorted = false;
                break;
            }
        }
        if (!isSorted) {
            return this.linearSearch(arr, target, compare);
        }
        // If data is numeric and looks uniform, use interpolation search
        if (typeof target === "number" &&
            arr.every((x) => typeof x === "number") &&
            this.isUniformlyDistributed(arr)) {
            return this.interpolationSearch(arr, target);
        }
        // Default to binary search for sorted data
        return this.binarySearch(arr, target, compare);
    }
    /**
     * Helper method to check if numeric data is uniformly distributed
     * @internal
     */
    static isUniformlyDistributed(arr) {
        if (arr.length < 4)
            return false;
        const diffs = [];
        for (let i = 1; i < arr.length; i++) {
            diffs.push(arr[i] - arr[i - 1]);
        }
        const avgDiff = diffs.reduce((a, b) => a + b) / diffs.length;
        const variance = diffs.reduce((a, b) => a + Math.pow(b - avgDiff, 2), 0) / diffs.length;
        // If variance is low, data is likely uniform
        return variance < avgDiff / 2;
    }
}
exports.Searching = Searching;
