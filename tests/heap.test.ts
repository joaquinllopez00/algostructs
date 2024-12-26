import { MinHeap, MaxHeap, CustomHeap, BinaryHeap } from "../src/data-structures/heap";

describe("MinHeap", () => {
  describe("basic operations", () => {
    it("should create an empty heap", () => {
      const heap = new MinHeap<number>();
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
      expect(heap.peek()).toBeUndefined();
    });

    it("should add elements correctly", () => {
      const heap = new MinHeap<number>();
      const heap2 = heap.add(5).add(3).add(7).add(1);
      expect(heap2.peek()).toBe(1);
      expect(heap2.size()).toBe(4);
      expect(heap.size()).toBe(0); // Original heap unchanged
    });

    it("should maintain min-heap property", () => {
      const heap = new MinHeap<number>();
      const heap2 = heap.add(5).add(3).add(7).add(1).add(4);
      const elements = [...heap2];
      expect(elements).toEqual([1, 3, 4, 5, 7]);
    });
  });

  describe("error handling", () => {
    it("should throw on null/undefined elements", () => {
      const heap = new MinHeap<number>();
      expect(() => heap.add(null as any)).toThrow(TypeError);
      expect(() => heap.add(undefined as any)).toThrow(TypeError);
    });
  });

  describe("removal operations", () => {
    it("should remove elements in correct order", () => {
      const heap = MinHeap.from([5, 3, 7, 1, 4]);
      const removed: number[] = [];
      let current = heap;

      while (!current.isEmpty()) {
        const result = current.remove();
        if (result.element !== undefined) {
          removed.push(result.element);
        }
        current = result.heap as MinHeap<number>;
      }

      expect(removed).toEqual([1, 3, 4, 5, 7]);
    });

    it("should handle remove from empty heap", () => {
      const heap = new MinHeap<number>();
      const { element, heap: newHeap } = heap.remove();
      expect(element).toBeUndefined();
      expect(newHeap.isEmpty()).toBe(true);
    });
  });

  describe("static factory methods", () => {
    it("should create heap from array", () => {
      const heap = MinHeap.from([5, 3, 7, 1, 4]);
      expect(heap.peek()).toBe(1);
      expect([...heap]).toEqual([1, 3, 4, 5, 7]);
    });

    it("should handle empty array", () => {
      const heap = MinHeap.from([]);
      expect(heap.isEmpty()).toBe(true);
    });
  });
});

describe("MaxHeap", () => {
  describe("basic operations", () => {
    it("should create an empty heap", () => {
      const heap = new MaxHeap<number>();
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
      expect(heap.peek()).toBeUndefined();
    });

    it("should add elements correctly", () => {
      const heap = new MaxHeap<number>();
      const heap2 = heap.add(5).add(3).add(7).add(1);
      expect(heap2.peek()).toBe(7);
      expect(heap2.size()).toBe(4);
      expect(heap.size()).toBe(0); // Original heap unchanged
    });

    it("should maintain max-heap property", () => {
      const heap = new MaxHeap<number>();
      const heap2 = heap.add(5).add(3).add(7).add(1).add(4);
      const elements = [...heap2];
      expect(elements).toEqual([7, 5, 4, 3, 1]);
    });
  });

  describe("removal operations", () => {
    it("should remove elements in correct order", () => {
      const heap = MaxHeap.from([5, 3, 7, 1, 4]);
      const removed: number[] = [];
      let current = heap;

      while (!current.isEmpty()) {
        const { element, heap: newHeap } = current.remove() as { element: number | undefined; heap: MaxHeap<number> };
        if (element !== undefined) {
          removed.push(element);
        }
        current = newHeap;
      }

      expect(removed).toEqual([7, 5, 4, 3, 1]);
    });
  });
});

describe("CustomHeap", () => {
  interface Task {
    priority: number;
    name: string;
  }

  describe("custom comparison", () => {
    it("should handle custom comparison function", () => {
      const tasks: Task[] = [
        { priority: 3, name: "Task 3" },
        { priority: 1, name: "Task 1" },
        { priority: 2, name: "Task 2" },
      ];
      const heap = new CustomHeap<Task>((a, b) => a.priority - b.priority);
      const heap2 = heap.add(tasks[0]).add(tasks[1]).add(tasks[2]);

      const removed: Task[] = [];
      let current = heap2;

      while (!current.isEmpty()) {
        const { element, heap: newHeap } = current.remove();
        if (element) {
          removed.push(element);
        }
        current = newHeap;
      }

      expect(removed.map((t) => t.priority)).toEqual([1, 2, 3]);
    });

    it("should handle reverse comparison", () => {
      const heap = new CustomHeap<number>((a, b) => b - a); // Max heap behavior
      const heap2 = heap.add(5).add(3).add(7).add(1);
      expect(heap2.peek()).toBe(7);
    });
  });

  describe("static factory methods", () => {
    it("should create heap from array with custom comparison", () => {
      const tasks: Task[] = [
        { priority: 3, name: "Task 3" },
        { priority: 1, name: "Task 1" },
        { priority: 2, name: "Task 2" },
      ];

      const heap = CustomHeap.from(tasks, (a, b) => a.priority - b.priority);
      expect(heap.peek()?.priority).toBe(1);
    });
  });
});

describe("BinaryHeap", () => {
  describe("type switching", () => {
    it("should work as min heap", () => {
      const heap = new BinaryHeap<number>("min");
      const heap2 = heap.add(5).add(3).add(7).add(1);
      expect(heap2.peek()).toBe(1);
      expect([...heap2]).toEqual([1, 3, 5, 7]);
    });

    it("should work as max heap", () => {
      const heap = new BinaryHeap<number>("max");
      const heap2 = heap.add(5).add(3).add(7).add(1);
      expect(heap2.peek()).toBe(7);
      expect([...heap2]).toEqual([7, 5, 3, 1]);
    });
  });

  describe("static factory methods", () => {
    it("should create min heap from array", () => {
      const heap = BinaryHeap.from([5, 3, 7, 1, 4], "min");
      expect(heap.peek()).toBe(1);
      expect([...heap]).toEqual([1, 3, 4, 5, 7]);
    });

    it("should create max heap from array", () => {
      const heap = BinaryHeap.from([5, 3, 7, 1, 4], "max");
      expect(heap.peek()).toBe(7);
      expect([...heap]).toEqual([7, 5, 4, 3, 1]);
    });
  });

  describe("property testing", () => {
    function isHeapPropertyMaintained<T extends number>(elements: T[], type: "min" | "max" = "min"): boolean {
      const compare =
        type === "min" ? (a: T, b: T) => (a as any) - (b as any) : (a: T, b: T) => (b as any) - (a as any);

      for (let i = 0; i < elements.length; i++) {
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;

        if (leftChild < elements.length) {
          if (compare(elements[i], elements[leftChild]) > 0) return false;
        }
        if (rightChild < elements.length) {
          if (compare(elements[i], elements[rightChild]) > 0) return false;
        }
      }
      return true;
    }

    it("should maintain heap property after multiple operations", () => {
      const numbers = Array.from({ length: 100 }, (_, i) => i);
      const shuffled = numbers.sort(() => Math.random() - 0.5);

      const minHeap = shuffled.reduce(
        (h: BinaryHeap<number>, n: number): BinaryHeap<number> => h.add(n) as BinaryHeap<number>,
        new BinaryHeap<number>("min"),
      );
      const maxHeap = shuffled.reduce(
        (h: BinaryHeap<number>, n: number): BinaryHeap<number> => h.add(n) as BinaryHeap<number>,
        new BinaryHeap<number>("max"),
      );

      expect(isHeapPropertyMaintained(Array.from(minHeap), "min")).toBe(true);
      expect(isHeapPropertyMaintained(Array.from(maxHeap), "max")).toBe(true);
    });
  });
});
