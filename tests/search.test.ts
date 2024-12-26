import { Searching } from "../src/algorithms/search";

describe("Searching", () => {
  describe("Binary Search", () => {
    it("should find element in sorted array", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = Searching.binarySearch(arr, 3);

      expect(result.element).toBe(3);
      expect(result.index).toBe(2);
      expect(result.comparisons).toBeGreaterThan(0);
    });

    it("should return -1 for non-existent element", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = Searching.binarySearch(arr, 6);

      expect(result.element).toBeUndefined();
      expect(result.index).toBe(-1);
    });

    it("should throw error for unsorted array", () => {
      const arr = [5, 2, 3, 1, 4];
      expect(() => Searching.binarySearch(arr, 3)).toThrow("Array must be sorted");
    });

    it("should work with custom comparator", () => {
      const arr = ["apple", "banana", "cherry", "date"];
      const result = Searching.binarySearch(arr, "cherry", (a, b) => a.localeCompare(b));

      expect(result.element).toBe("cherry");
      expect(result.index).toBe(2);
    });
  });

  describe("Linear Search", () => {
    it("should find element in unsorted array", () => {
      const arr = [5, 2, 8, 1, 9];
      const result = Searching.linearSearch(arr, 8);

      expect(result.element).toBe(8);
      expect(result.index).toBe(2);
      expect(result.comparisons).toBe(3); // Found in 3rd comparison
    });

    it("should work with duplicate elements", () => {
      const arr = [1, 2, 2, 3];
      const result = Searching.linearSearch(arr, 2);

      expect(result.element).toBe(2);
      expect(result.index).toBe(1); // Returns first occurrence
    });

    it("should handle empty array", () => {
      const result = Searching.linearSearch([], 5);
      expect(result.element).toBeUndefined();
      expect(result.index).toBe(-1);
      expect(result.comparisons).toBe(0);
    });
  });

  describe("Jump Search", () => {
    it("should find element in sorted array", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const result = Searching.jumpSearch(arr, 6);

      expect(result.element).toBe(6);
      expect(result.index).toBe(5);
      expect(result.comparisons).toBeGreaterThan(0);
    });

    it("should throw error for unsorted array", () => {
      const arr = [5, 2, 3, 1, 4];
      expect(() => Searching.jumpSearch(arr, 3)).toThrow("Array must be sorted");
    });

    it("should handle edge elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const firstResult = Searching.jumpSearch(arr, 1);
      const lastResult = Searching.jumpSearch(arr, 5);

      expect(firstResult.element).toBe(1);
      expect(lastResult.element).toBe(5);
    });
  });

  describe("Interpolation Search", () => {
    it("should find element in uniformly distributed array", () => {
      const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
      const result = Searching.interpolationSearch(arr, 60);

      expect(result.element).toBe(60);
      expect(result.index).toBe(5);
      expect(result.comparisons).toBeLessThan(arr.length);
    });

    it("should handle edge cases", () => {
      const arr = [1, 2, 3, 4, 5];
      const firstResult = Searching.interpolationSearch(arr, 1);
      const lastResult = Searching.interpolationSearch(arr, 5);

      expect(firstResult.element).toBe(1);
      expect(lastResult.element).toBe(5);
    });

    it("should handle non-existent elements", () => {
      const arr = [10, 20, 30, 40, 50];
      const result = Searching.interpolationSearch(arr, 25);

      expect(result.element).toBeUndefined();
      expect(result.index).toBe(-1);
    });
  });

  describe("Exponential Search", () => {
    it("should find element in sorted array", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const result = Searching.exponentialSearch(arr, 6);

      expect(result.element).toBe(6);
      expect(result.index).toBe(5);
      expect(result.comparisons).toBeGreaterThan(0);
    });

    it("should handle first element", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = Searching.exponentialSearch(arr, 1);

      expect(result.element).toBe(1);
      expect(result.index).toBe(0);
      expect(result.comparisons).toBe(1); // Only one comparison needed
    });

    it("should handle empty array", () => {
      const result = Searching.exponentialSearch([], 5);
      expect(result.element).toBeUndefined();
      expect(result.index).toBe(-1);
    });
  });

  describe("Smart Search", () => {
    it("should use linear search for small arrays", () => {
      const arr = [5, 3, 7, 1, 9]; // Length <= 10
      const result = Searching.search(arr, 7);

      expect(result.element).toBe(7);
      expect(result.index).toBe(2);
    });

    it("should use interpolation search for uniform numeric data", () => {
      const arr = Array.from({ length: 20 }, (_, i) => i * 10); // Uniform distribution
      const result = Searching.search(arr, 50);

      expect(result.element).toBe(50);
      expect(result.index).toBe(5);
    });

    it("should use binary search for sorted non-uniform data", () => {
      const arr = [1, 2, 4, 8, 16, 32, 64]; // Sorted but not uniform
      const result = Searching.search(arr, 16);

      expect(result.element).toBe(16);
      expect(result.index).toBe(4);
    });

    it("should fall back to linear search for unsorted data", () => {
      const arr = [5, 2, 8, 1, 9, 3, 7, 4, 6]; // Unsorted
      const result = Searching.search(arr, 7);

      expect(result.element).toBe(7);
      expect(result.index).toBe(6);
    });
  });

  describe("Edge Cases", () => {
    it("should handle arrays with duplicates", () => {
      const arr = [1, 2, 2, 2, 3];
      const linearResult = Searching.linearSearch(arr, 2);
      const binaryResult = Searching.binarySearch(arr, 2);

      expect(linearResult.element).toBe(2);
      expect(binaryResult.element).toBe(2);
    });

    it("should handle single-element arrays", () => {
      const arr = [1];
      expect(Searching.linearSearch(arr, 1).element).toBe(1);
      expect(Searching.binarySearch(arr, 1).element).toBe(1);
      expect(Searching.jumpSearch(arr, 1).element).toBe(1);
      expect(Searching.exponentialSearch(arr, 1).element).toBe(1);
    });

    it("should handle custom objects with comparator", () => {
      interface Person {
        id: number;
        name: string;
      }

      const arr: Person[] = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ];

      const comparator = (a: Person, b: Person) => a.id - b.id;
      const result = Searching.binarySearch(arr, { id: 2, name: "Bob" }, comparator);

      expect(result.element).toEqual({ id: 2, name: "Bob" });
    });

    it("should maintain comparison count accuracy", () => {
      const arr = [1, 2, 3, 4, 5];
      const linearResult = Searching.linearSearch(arr, 5);
      const binaryResult = Searching.binarySearch(arr, 5);

      expect(linearResult.comparisons).toBe(5); // Last element
      expect(binaryResult.comparisons).toBeLessThan(5); // Log2(n) comparisons
    });
  });
});
