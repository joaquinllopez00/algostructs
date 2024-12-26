"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorting = void 0;
/**
 * A collection of sorting algorithms with different time/space complexities
 * and characteristics. Each algorithm is implemented as a pure function
 * that returns a new sorted array.
 */
class Sorting {
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
    static quickSort(arr, compare = (a, b) => a - b) {
        if (arr.length <= 1)
            return [...arr];
        const result = [...arr];
        const partition = (low, high) => {
            const pivot = result[Math.floor((low + high) / 2)];
            let i = low - 1;
            let j = high + 1;
            while (true) {
                do {
                    i++;
                } while (compare(result[i], pivot) < 0);
                do {
                    j--;
                } while (compare(result[j], pivot) > 0);
                if (i >= j)
                    return j;
                [result[i], result[j]] = [result[j], result[i]];
            }
        };
        const sort = (low, high) => {
            if (low < high) {
                const p = partition(low, high);
                sort(low, p);
                sort(p + 1, high);
            }
        };
        sort(0, result.length - 1);
        return result;
    }
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
    static mergeSort(arr, compare = (a, b) => a - b) {
        if (arr.length <= 1)
            return [...arr];
        const merge = (left, right) => {
            const result = [];
            let i = 0, j = 0;
            while (i < left.length && j < right.length) {
                if (compare(left[i], right[j]) <= 0) {
                    result.push(left[i++]);
                }
                else {
                    result.push(right[j++]);
                }
            }
            return [...result, ...left.slice(i), ...right.slice(j)];
        };
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        return merge(Sorting.mergeSort(left, compare), Sorting.mergeSort(right, compare));
    }
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
    static heapSort(arr, compare = (a, b) => a - b) {
        const result = [...arr];
        const heapify = (n, i) => {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < n && compare(result[left], result[largest]) > 0) {
                largest = left;
            }
            if (right < n && compare(result[right], result[largest]) > 0) {
                largest = right;
            }
            if (largest !== i) {
                [result[i], result[largest]] = [result[largest], result[i]];
                heapify(n, largest);
            }
        };
        // Build max heap
        for (let i = Math.floor(result.length / 2) - 1; i >= 0; i--) {
            heapify(result.length, i);
        }
        // Extract elements from heap
        for (let i = result.length - 1; i > 0; i--) {
            [result[0], result[i]] = [result[i], result[0]];
            heapify(i, 0);
        }
        return result;
    }
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
    static insertionSort(arr, compare = (a, b) => a - b) {
        const result = [...arr];
        for (let i = 1; i < result.length; i++) {
            const key = result[i];
            let j = i - 1;
            while (j >= 0 && compare(result[j], key) > 0) {
                result[j + 1] = result[j];
                j--;
            }
            result[j + 1] = key;
        }
        return result;
    }
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
    static countingSort(arr) {
        if (arr.length <= 1)
            return [...arr];
        if (arr.some((n) => n < 0)) {
            throw new Error("Counting sort only works with non-negative integers");
        }
        const max = Math.max(...arr);
        const count = new Array(max + 1).fill(0);
        const result = new Array(arr.length);
        // Count occurrences
        for (const num of arr) {
            count[num]++;
        }
        // Calculate cumulative count
        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }
        // Build output array
        for (let i = arr.length - 1; i >= 0; i--) {
            result[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        return result;
    }
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
    static sort(arr, compare = (a, b) => a - b) {
        // For small arrays, insertion sort is faster
        if (arr.length <= 10) {
            return Sorting.insertionSort(arr, compare);
        }
        // For larger arrays, use quicksort
        return Sorting.quickSort(arr, compare);
    }
    /**
     * Checks if an array is sorted according to a comparison function
     *
     * @template T The type of elements to check
     * @param arr - Array to check
     * @param compare - Optional comparison function
     * @returns true if the array is sorted
     */
    static isSorted(arr, compare = (a, b) => a - b) {
        for (let i = 1; i < arr.length; i++) {
            if (compare(arr[i - 1], arr[i]) > 0) {
                return false;
            }
        }
        return true;
    }
}
exports.Sorting = Sorting;
