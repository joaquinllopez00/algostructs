import { Deque, CircularQueue, PriorityQueue, MaxPriorityQueue } from "../src/data-structures/queue";

describe("Deque", () => {
  describe("basic operations", () => {
    it("should create an empty deque", () => {
      const deque = new Deque<number>();
      expect(deque.isEmpty()).toBe(true);
      expect(deque.size()).toBe(0);
      expect(deque.peekFront()).toBeUndefined();
      expect(deque.peekBack()).toBeUndefined();
    });

    it("should handle pushFront operations", () => {
      const deque = new Deque<number>();
      const deque2 = deque.pushFront(1, 2, 3);

      expect(deque.isEmpty()).toBe(true); // Original unchanged
      expect(deque2.size()).toBe(3);
      expect(deque2.peekFront()).toBe(1);
      expect(deque2.peekBack()).toBe(3);
      expect([...deque2]).toEqual([1, 2, 3]);
    });

    it("should handle pushBack operations", () => {
      const deque = new Deque<number>();
      const deque2 = deque.pushBack(1, 2, 3);

      expect(deque.isEmpty()).toBe(true); // Original unchanged
      expect(deque2.size()).toBe(3);
      expect(deque2.peekFront()).toBe(1);
      expect(deque2.peekBack()).toBe(3);
      expect([...deque2]).toEqual([1, 2, 3]);
    });

    it("should handle mixed operations", () => {
      const deque = new Deque<number>();
      const deque2 = deque.pushBack(2, 3).pushFront(1).pushBack(4);

      expect([...deque2]).toEqual([1, 2, 3, 4]);
    });
  });

  describe("removal operations", () => {
    it("should handle popFront operations", () => {
      const deque = Deque.from([1, 2, 3]);
      const { element, deque: deque2 } = deque.popFront();

      expect(element).toBe(1);
      expect([...deque2]).toEqual([2, 3]);
      expect(deque2.size()).toBe(2);
    });

    it("should handle popBack operations", () => {
      const deque = Deque.from([1, 2, 3]);
      const { element, deque: deque2 } = deque.popBack();

      expect(element).toBe(3);
      expect([...deque2]).toEqual([1, 2]);
      expect(deque2.size()).toBe(2);
    });

    it("should handle empty deque removals", () => {
      const deque = new Deque<number>();
      const { element: front } = deque.popFront();
      const { element: back } = deque.popBack();

      expect(front).toBeUndefined();
      expect(back).toBeUndefined();
    });
  });

  describe("static factory methods", () => {
    it("should create from array", () => {
      const deque = Deque.from([1, 2, 3]);
      expect([...deque]).toEqual([1, 2, 3]);
    });

    it("should handle empty array", () => {
      const deque = Deque.from([]);
      expect(deque.isEmpty()).toBe(true);
    });
  });
});

describe("CircularQueue", () => {
  describe("basic operations", () => {
    it("should create empty queue with capacity", () => {
      const queue = new CircularQueue<number>(3);
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.getCapacity()).toBe(3);
    });

    it("should throw error for invalid capacity", () => {
      expect(() => new CircularQueue<number>(0)).toThrow();
      expect(() => new CircularQueue<number>(-1)).toThrow();
    });

    it("should handle enqueue within capacity", () => {
      const queue = new CircularQueue<number>(3);
      const queue2 = queue.enqueue(1).enqueue(2);

      expect(queue.isEmpty()).toBe(true); // Original unchanged
      expect(queue2.size()).toBe(2);
      expect([...queue2]).toEqual([1, 2]);
    });

    it("should handle overflow by removing oldest elements", () => {
      const queue = new CircularQueue<number>(3);
      const queue2 = queue.enqueue(1).enqueue(2).enqueue(3).enqueue(4);

      expect(queue2.size()).toBe(3);
      expect([...queue2]).toEqual([2, 3, 4]);
    });
  });

  describe("dequeue operations", () => {
    it("should dequeue elements in order", () => {
      const queue = new CircularQueue<number>(3);
      const queue2 = queue.enqueue(1).enqueue(2).enqueue(3);
      const { element, queue: queue3 } = queue2.dequeue();

      expect(element).toBe(1);
      expect([...queue3]).toEqual([2, 3]);
    });

    it("should handle empty queue dequeue", () => {
      const queue = new CircularQueue<number>(3);
      const { element } = queue.dequeue();
      expect(element).toBeUndefined();
    });
  });

  describe("capacity checks", () => {
    it("should correctly report full status", () => {
      const queue = new CircularQueue<number>(2);
      const queue2 = queue.enqueue(1);
      const queue3 = queue2.enqueue(2);

      expect(queue2.isFull()).toBe(false);
      expect(queue3.isFull()).toBe(true);
    });
  });
});

describe("PriorityQueue", () => {
  describe("basic operations", () => {
    it("should create an empty queue", () => {
      const queue = new PriorityQueue<number>();
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.peek()).toBeUndefined();
    });

    it("should maintain min-heap property", () => {
      const queue = new PriorityQueue<number>();
      const queue2 = queue.enqueue(5).enqueue(2).enqueue(8).enqueue(1).enqueue(3);

      expect(queue2.peek()).toBe(1);
      const elements = [...queue2];
      expect(elements).toEqual([1, 2, 3, 5, 8]);
    });

    it("should handle custom comparison", () => {
      const queue = new PriorityQueue<number>((a, b) => b - a); // max heap
      const queue2 = queue.enqueue(5).enqueue(2).enqueue(8).enqueue(1);

      expect(queue2.peek()).toBe(8);
      const elements = [...queue2];
      expect(elements).toEqual([8, 5, 2, 1]);
    });
  });

  describe("error handling", () => {
    it("should throw on null/undefined elements", () => {
      const queue = new PriorityQueue<number>();
      expect(() => queue.enqueue(null as any)).toThrow(TypeError);
      expect(() => queue.enqueue(undefined as any)).toThrow(TypeError);
    });

    it("should throw on invalid comparison function", () => {
      expect(() => new PriorityQueue<number>("invalid" as any)).toThrow(TypeError);
    });
  });

  describe("dequeue operations", () => {
    it("should dequeue elements in priority order", () => {
      const queue = PriorityQueue.from([5, 2, 8, 1, 3]);
      const elements: number[] = [];
      let current = queue;

      while (!current.isEmpty()) {
        const { element, queue: next } = current.dequeue() as { element: number; queue: PriorityQueue<number> };
        elements.push(element);
        current = next;
      }

      expect(elements).toEqual([1, 2, 3, 5, 8]);
    });
  });

  describe("static factory methods", () => {
    it("should create from array", () => {
      const queue = PriorityQueue.from([5, 2, 8, 1, 3]);
      console.log(queue);
      expect(queue.peek()).toBe(1);
    });

    it("should throw on invalid input", () => {
      expect(() => PriorityQueue.from(null as any)).toThrow(TypeError);
    });
  });
});

describe("MaxPriorityQueue", () => {
  describe("basic operations", () => {
    it("should create an empty queue", () => {
      const queue = new MaxPriorityQueue<number>();
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.peek()).toBeUndefined();
    });

    it("should maintain max-heap property", () => {
      const queue = new MaxPriorityQueue<number>();
      const queue2 = queue.enqueue(5).enqueue(2).enqueue(8).enqueue(1).enqueue(3);

      expect(queue2.peek()).toBe(8);
      const elements = [...queue2];
      expect(elements).toEqual([8, 5, 3, 2, 1]);
    });
  });

  describe("dequeue operations", () => {
    it("should dequeue elements in descending order", () => {
      const queue = MaxPriorityQueue.from([5, 2, 8, 1, 3]);
      const elements: number[] = [];
      let current = queue;

      while (!current.isEmpty()) {
        const { element, queue: next } = current.dequeue() as { element: number; queue: MaxPriorityQueue<number> };
        elements.push(element);
        current = next;
      }

      expect(elements).toEqual([8, 5, 3, 2, 1]);
    });
  });

  describe("custom comparison", () => {
    interface Task {
      priority: number;
      name: string;
    }

    it("should handle custom comparison function", () => {
      const queue = new MaxPriorityQueue<Task>((a, b) => a.priority - b.priority);
      const queue2 = queue
        .enqueue({ priority: 3, name: "Task 3" })
        .enqueue({ priority: 1, name: "Task 1" })
        .enqueue({ priority: 2, name: "Task 2" });

      expect(queue2.peek()?.priority).toBe(3);
    });
  });
});
