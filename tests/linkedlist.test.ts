import { LinkedList, DoublyLinkedList } from "../src/data-structures/linkedlist";

describe("LinkedList", () => {
  describe("basic operations", () => {
    it("should create an empty list", () => {
      const list = new LinkedList<number>();
      expect(list.isEmpty()).toBe(true);
      expect(list.size()).toBe(0);
      expect(list.first()).toBeUndefined();
    });

    it("should handle prepend operations", () => {
      const list = new LinkedList<number>();
      const list2 = list.prepend(1).prepend(2).prepend(3);

      expect(list.isEmpty()).toBe(true); // Original unchanged
      expect(list2.size()).toBe(3);
      expect(list2.first()).toBe(3);
      expect([...list2]).toEqual([3, 2, 1]);
    });

    it("should handle append operations", () => {
      const list = new LinkedList<number>();
      const list2 = list.append(1).append(2).append(3);

      expect(list.isEmpty()).toBe(true); // Original unchanged
      expect(list2.size()).toBe(3);
      expect(list2.first()).toBe(1);
      expect([...list2]).toEqual([1, 2, 3]);
    });

    it("should handle mixed append and prepend", () => {
      const list = new LinkedList<number>();
      const list2 = list.append(2).prepend(1).append(3);
      expect([...list2]).toEqual([1, 2, 3]);
    });
  });

  describe("removal operations", () => {
    it("should remove elements correctly", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      const list2 = list.remove(3);

      expect([...list]).toEqual([1, 2, 3, 4, 5]); // Original unchanged
      expect([...list2]).toEqual([1, 2, 4, 5]);
    });

    it("should handle removing first element", () => {
      const list = LinkedList.from([1, 2, 3]);
      const list2 = list.remove(1);
      expect([...list2]).toEqual([2, 3]);
    });

    it("should handle removing last element", () => {
      const list = LinkedList.from([1, 2, 3]);
      const list2 = list.remove(3);
      expect([...list2]).toEqual([1, 2]);
    });

    it("should handle removing non-existent element", () => {
      const list = LinkedList.from([1, 2, 3]);
      const list2 = list.remove(4);
      expect([...list2]).toEqual([1, 2, 3]);
    });

    it("should handle removing from empty list", () => {
      const list = new LinkedList<number>();
      const list2 = list.remove(1);
      expect(list2.isEmpty()).toBe(true);
    });
  });

  describe("contains operation", () => {
    it("should find existing elements", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      expect(list.contains(3)).toBe(true);
      expect(list.contains(1)).toBe(true);
      expect(list.contains(5)).toBe(true);
    });

    it("should not find non-existent elements", () => {
      const list = LinkedList.from([1, 2, 3]);
      expect(list.contains(4)).toBe(false);
      expect(list.contains(0)).toBe(false);
    });

    it("should handle empty list", () => {
      const list = new LinkedList<number>();
      expect(list.contains(1)).toBe(false);
    });
  });

  describe("reverse operation", () => {
    it("should reverse non-empty list", () => {
      const list = LinkedList.from([1, 2, 3, 4, 5]);
      const reversed = list.reverse();
      expect([...reversed]).toEqual([5, 4, 3, 2, 1]);
    });

    it("should handle single element", () => {
      const list = LinkedList.from([1]);
      const reversed = list.reverse();
      expect([...reversed]).toEqual([1]);
    });

    it("should handle empty list", () => {
      const list = new LinkedList<number>();
      const reversed = list.reverse();
      expect(reversed.isEmpty()).toBe(true);
    });
  });

  describe("static factory methods", () => {
    it("should create from array", () => {
      const list = LinkedList.from([1, 2, 3]);
      expect([...list]).toEqual([1, 2, 3]);
    });

    it("should handle empty array", () => {
      const list = LinkedList.from([]);
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe("string representation", () => {
    it("should convert to string correctly", () => {
      const list = LinkedList.from([1, 2, 3]);
      expect(list.toString()).toBe("1 -> 2 -> 3");
    });

    it("should handle empty list", () => {
      const list = new LinkedList<number>();
      expect(list.toString()).toBe("");
    });
  });
});

describe("DoublyLinkedList", () => {
  describe("basic operations", () => {
    it("should create an empty list", () => {
      const list = new DoublyLinkedList<number>();
      expect(list.isEmpty()).toBe(true);
      expect(list.size()).toBe(0);
      expect(list.first()).toBeUndefined();
      expect(list.last()).toBeUndefined();
    });

    it("should handle prepend operations", () => {
      const list = new DoublyLinkedList<number>();
      const list2 = list.prepend(1).prepend(2).prepend(3);

      expect(list.isEmpty()).toBe(true); // Original unchanged
      expect(list2.size()).toBe(3);
      expect(list2.first()).toBe(3);
      expect(list2.last()).toBe(1);
      expect([...list2]).toEqual([3, 2, 1]);
    });

    it("should handle append operations", () => {
      const list = new DoublyLinkedList<number>();
      const list2 = list.append(1).append(2).append(3);

      expect(list.isEmpty()).toBe(true); // Original unchanged
      expect(list2.size()).toBe(3);
      expect(list2.first()).toBe(1);
      expect(list2.last()).toBe(3);
      expect([...list2]).toEqual([1, 2, 3]);
    });
  });

  describe("removal operations", () => {
    it("should remove elements correctly", () => {
      const list = DoublyLinkedList.from([1, 2, 3, 4, 5]);
      const list2 = list.remove(3);

      expect([...list]).toEqual([1, 2, 3, 4, 5]); // Original unchanged
      expect([...list2]).toEqual([1, 2, 4, 5]);
      expect(list2.first()).toBe(1);
      expect(list2.last()).toBe(5);
    });

    it("should handle removing first element", () => {
      const list = DoublyLinkedList.from([1, 2, 3]);
      const list2 = list.remove(1);
      expect([...list2]).toEqual([2, 3]);
      expect(list2.first()).toBe(2);
      expect(list2.last()).toBe(3);
    });

    it("should handle removing last element", () => {
      const list = DoublyLinkedList.from([1, 2, 3]);
      const list2 = list.remove(3);
      expect([...list2]).toEqual([1, 2]);
      expect(list2.first()).toBe(1);
      expect(list2.last()).toBe(2);
    });
  });

  describe("reverse operation", () => {
    it("should reverse non-empty list", () => {
      const list = DoublyLinkedList.from([1, 2, 3, 4, 5]);
      const reversed = list.reverse();
      expect([...reversed]).toEqual([5, 4, 3, 2, 1]);
      expect(reversed.first()).toBe(5);
      expect(reversed.last()).toBe(1);
    });

    it("should maintain proper links after reverse", () => {
      const list = DoublyLinkedList.from([1, 2, 3]);
      const reversed = list.reverse();
      expect([...reversed]).toEqual([3, 2, 1]);
      const reverseValues: number[] = [];
      for (const item of reversed.reverseIterator()) {
        reverseValues.push(item);
      }
      expect(reverseValues).toEqual([1, 2, 3]);
    });
  });

  describe("bidirectional iteration", () => {
    it("should iterate forward correctly", () => {
      const list = DoublyLinkedList.from([1, 2, 3]);
      expect([...list]).toEqual([1, 2, 3]);
    });

    it("should iterate backward correctly", () => {
      const list = DoublyLinkedList.from([1, 2, 3]);
      const reverseArray: number[] = [];
      for (const item of Array.from(list.reverseIterator())) {
        reverseArray.push(item);
      }
      expect(reverseArray).toEqual([3, 2, 1]);
    });

    it("should handle single element iteration", () => {
      const list = DoublyLinkedList.from([1]);
      expect([...list]).toEqual([1]);
      const singleReverseValue: number[] = [];
      for (const item of list.reverseIterator()) {
        singleReverseValue.push(item);
      }
      expect(singleReverseValue).toEqual([1]);
    });

    it("should handle empty list iteration", () => {
      const list = new DoublyLinkedList<number>();
      expect([...list]).toEqual([]);
      const emptyReverseValues: number[] = [];
      for (const item of list.reverseIterator()) {
        emptyReverseValues.push(item);
      }
      expect(emptyReverseValues).toEqual([]);
    });
  });

  describe("string representation", () => {
    it("should convert to string correctly", () => {
      const list = DoublyLinkedList.from([1, 2, 3]);
      expect(list.toString()).toBe("1 <-> 2 <-> 3");
    });

    it("should handle empty list", () => {
      const list = new DoublyLinkedList<number>();
      expect(list.toString()).toBe("");
    });
  });
});
