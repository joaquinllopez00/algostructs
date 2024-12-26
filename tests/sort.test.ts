import { Sorting } from "../src/algorithms/sort";

describe("Sorting", () => {
  // Helper function to create shuffled arrays
  const createShuffledArray = (size: number): number[] => {
    const arr = Array.from({ length: size }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  describe("QuickSort", () => {
    it("should sort numeric array", () => {
      const arr = [5, 2, 8, 1, 9, 3];
      const sorted = Sorting.quickSort(arr);
      expect(sorted).toEqual([1, 2, 3, 5, 8, 9]);
      expect(arr).toEqual([5, 2, 8, 1, 9, 3]); // Original unchanged
    });

    it("should handle already sorted array", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(Sorting.quickSort(arr)).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle reverse sorted array", () => {
      const arr = [5, 4, 3, 2, 1];
      expect(Sorting.quickSort(arr)).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle custom comparator", () => {
      const arr = ["banana", "apple", "cherry"];
      const sorted = Sorting.quickSort(arr, (a, b) => a.localeCompare(b));
      expect(sorted).toEqual(["apple", "banana", "cherry"]);
    });
  });

  describe("MergeSort", () => {
    it("should sort numeric array", () => {
      const arr = [5, 2, 8, 1, 9, 3];
      const sorted = Sorting.mergeSort(arr);
      expect(sorted).toEqual([1, 2, 3, 5, 8, 9]);
      expect(arr).toEqual([5, 2, 8, 1, 9, 3]); // Original unchanged
    });

    it("should maintain stability", () => {
      interface Item {
        value: number;
        id: number;
      }
      const arr: Item[] = [
        { value: 1, id: 1 },
        { value: 1, id: 2 },
        { value: 1, id: 3 },
      ];
      const sorted = Sorting.mergeSort(arr, (a, b) => a.value - b.value);
      expect(sorted[0].id).toBe(1);
      expect(sorted[1].id).toBe(2);
      expect(sorted[2].id).toBe(3);
    });

    it("should handle large arrays", () => {
      const arr = createShuffledArray(1000);
      const sorted = Sorting.mergeSort(arr);
      expect(Sorting.isSorted(sorted)).toBe(true);
    });
  });

  describe("HeapSort", () => {
    it("should sort numeric array", () => {
      const arr = [5, 2, 8, 1, 9, 3];
      const sorted = Sorting.heapSort(arr);
      expect(sorted).toEqual([1, 2, 3, 5, 8, 9]);
    });

    it("should handle duplicate elements", () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const sorted = Sorting.heapSort(arr);
      expect(sorted).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it("should handle custom objects", () => {
      interface Person {
        age: number;
        name: string;
      }
      const people: Person[] = [
        { age: 30, name: "Alice" },
        { age: 25, name: "Bob" },
        { age: 35, name: "Charlie" },
      ];
      const sorted = Sorting.heapSort(people, (a, b) => a.age - b.age);
      expect(sorted[0].age).toBe(25);
      expect(sorted[2].age).toBe(35);
    });
  });

  describe("InsertionSort", () => {
    it("should sort numeric array", () => {
      const arr = [5, 2, 8, 1, 9, 3];
      const sorted = Sorting.insertionSort(arr);
      expect(sorted).toEqual([1, 2, 3, 5, 8, 9]);
    });

    it("should be efficient for nearly sorted arrays", () => {
      const arr = [1, 2, 4, 3, 5, 6];
      const sorted = Sorting.insertionSort(arr);
      expect(sorted).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should maintain stability", () => {
      interface Item {
        value: number;
        id: number;
      }
      const arr: Item[] = [
        { value: 2, id: 1 },
        { value: 2, id: 2 },
        { value: 1, id: 3 },
      ];
      const sorted = Sorting.insertionSort(arr, (a, b) => a.value - b.value);
      expect(sorted[1].id).toBe(1); // First 2
      expect(sorted[2].id).toBe(2); // Second 2
    });
  });

  describe("CountingSort", () => {
    it("should sort non-negative integers", () => {
      const arr = [5, 2, 8, 1, 9, 3];
      const sorted = Sorting.countingSort(arr);
      expect(sorted).toEqual([1, 2, 3, 5, 8, 9]);
    });

    it("should handle duplicate elements", () => {
      const arr = [4, 2, 2, 8, 3, 3, 1];
      const sorted = Sorting.countingSort(arr);
      expect(sorted).toEqual([1, 2, 2, 3, 3, 4, 8]);
    });

    it("should throw error for negative numbers", () => {
      const arr = [5, 2, -1, 8, 1];
      expect(() => Sorting.countingSort(arr)).toThrow("Counting sort only works with non-negative integers");
    });

    it("should maintain stability", () => {
      const arr = [3, 1, 2, 1, 2];
      const sorted = Sorting.countingSort(arr);
      expect(sorted).toEqual([1, 1, 2, 2, 3]);
    });
  });

  describe("Hybrid Sort", () => {
    it("should use insertion sort for small arrays", () => {
      const arr = [5, 2, 8, 1, 9]; // Length <= 10
      const sorted = Sorting.sort(arr);
      expect(sorted).toEqual([1, 2, 5, 8, 9]);
    });

    it("should use quicksort for larger arrays", () => {
      const arr = createShuffledArray(100); // Length > 10
      const sorted = Sorting.sort(arr);
      expect(Sorting.isSorted(sorted)).toBe(true);
    });

    it("should handle custom comparator", () => {
      const arr = ["banana", "apple", "cherry", "date", "elderberry"];
      const sorted = Sorting.sort(arr, (a, b) => a.localeCompare(b));
      expect(sorted).toEqual(["apple", "banana", "cherry", "date", "elderberry"]);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty arrays", () => {
      expect(Sorting.quickSort([])).toEqual([]);
      expect(Sorting.mergeSort([])).toEqual([]);
      expect(Sorting.heapSort([])).toEqual([]);
      expect(Sorting.insertionSort([])).toEqual([]);
      expect(Sorting.countingSort([])).toEqual([]);
    });

    it("should handle single element arrays", () => {
      const arr = [1];
      expect(Sorting.quickSort(arr)).toEqual([1]);
      expect(Sorting.mergeSort(arr)).toEqual([1]);
      expect(Sorting.heapSort(arr)).toEqual([1]);
      expect(Sorting.insertionSort(arr)).toEqual([1]);
      expect(Sorting.countingSort(arr)).toEqual([1]);
    });

    it("should handle arrays with all same elements", () => {
      const arr = [2, 2, 2, 2, 2];
      expect(Sorting.quickSort(arr)).toEqual([2, 2, 2, 2, 2]);
      expect(Sorting.mergeSort(arr)).toEqual([2, 2, 2, 2, 2]);
      expect(Sorting.heapSort(arr)).toEqual([2, 2, 2, 2, 2]);
      expect(Sorting.insertionSort(arr)).toEqual([2, 2, 2, 2, 2]);
      expect(Sorting.countingSort(arr)).toEqual([2, 2, 2, 2, 2]);
    });
  });

  describe("Utility Functions", () => {
    it("should correctly identify sorted arrays", () => {
      expect(Sorting.isSorted([1, 2, 3, 4, 5])).toBe(true);
      expect(Sorting.isSorted([1, 3, 2, 4, 5])).toBe(false);
      expect(Sorting.isSorted([])).toBe(true);
      expect(Sorting.isSorted([1])).toBe(true);
    });

    it("should work with custom comparator for isSorted", () => {
      const arr = ["apple", "banana", "cherry"];
      expect(Sorting.isSorted(arr, (a, b) => a.localeCompare(b))).toBe(true);
      expect(Sorting.isSorted(["cherry", "apple", "banana"], (a, b) => a.localeCompare(b))).toBe(false);
    });
  });
});
