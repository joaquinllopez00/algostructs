import { BinarySearchTree, Trie, GeneralTree } from "../src/data-structures/tree";

describe("BinarySearchTree", () => {
  describe("basic operations", () => {
    it("should create an empty tree", () => {
      const bst = new BinarySearchTree<number>();
      expect(bst.size()).toBe(0);
      expect([...bst]).toEqual([]);
    });

    it("should handle single insertion", () => {
      const bst = new BinarySearchTree<number>();
      const bst2 = bst.insert(5);

      expect(bst.size()).toBe(0); // Original unchanged
      expect(bst2.size()).toBe(1);
      expect([...bst2]).toEqual([5]);
    });

    it("should maintain BST property during insertions", () => {
      const bst = new BinarySearchTree<number>();
      const bst2 = bst.insert(5).insert(3).insert(7).insert(2).insert(6);

      const values = [...bst2];
      expect(values).toEqual([2, 3, 5, 6, 7]); // Inorder should be sorted
    });
  });

  describe("removal operations", () => {
    it("should handle leaf node removal", () => {
      const bst = new BinarySearchTree<number>();
      const bst2 = bst.insert(5).insert(3).insert(7);
      const bst3 = bst2.remove(3);

      expect([...bst3]).toEqual([5, 7]);
      expect(bst3.size()).toBe(2);
    });

    it("should handle single child removal", () => {
      const bst = new BinarySearchTree<number>().insert(5).insert(3).insert(2);
      const bst2 = bst.remove(3);

      expect([...bst2]).toEqual([2, 5]);
      expect(bst2.contains(3)).toBe(false);
    });

    it("should handle two children removal", () => {
      const bst = new BinarySearchTree<number>().insert(5).insert(3).insert(7).insert(6).insert(8);
      const bst2 = bst.remove(7);

      expect([...bst2]).toEqual([3, 5, 6, 8]);
      expect(bst2.contains(7)).toBe(false);
    });

    it("should handle root removal", () => {
      const bst = new BinarySearchTree<number>().insert(5).insert(3).insert(7);
      const bst2 = bst.remove(5);

      expect(bst2.size()).toBe(2);
      const values = [...bst2];
      expect(values.length).toBe(2);
      expect(values).not.toContain(5);
    });
  });

  describe("search operations", () => {
    it("should find existing values", () => {
      const bst = new BinarySearchTree<number>().insert(5).insert(3).insert(7);

      expect(bst.contains(3)).toBe(true);
      expect(bst.contains(5)).toBe(true);
      expect(bst.contains(7)).toBe(true);
    });

    it("should not find non-existent values", () => {
      const bst = new BinarySearchTree<number>().insert(5).insert(3).insert(7);

      expect(bst.contains(4)).toBe(false);
      expect(bst.contains(6)).toBe(false);
    });
  });
});

describe("Trie", () => {
  describe("insertion and search", () => {
    it("should create an empty trie", () => {
      const trie = new Trie();
      expect(trie.contains("")).toBe(false);
    });

    it("should insert and find words", () => {
      const trie = new Trie();
      const trie2 = trie.insert("hello").insert("help").insert("heap");

      expect(trie2.contains("hello")).toBe(true);
      expect(trie2.contains("help")).toBe(true);
      expect(trie2.contains("heap")).toBe(true);
      expect(trie2.contains("hell")).toBe(false);
    });

    it("should be case insensitive", () => {
      const trie = new Trie();
      const trie2 = trie.insert("Hello");

      expect(trie2.contains("hello")).toBe(true);
      expect(trie2.contains("HELLO")).toBe(true);
      expect(trie2.contains("HeLLo")).toBe(true);
    });
  });

  describe("prefix operations", () => {
    it("should find prefixes", () => {
      const trie = new Trie();
      const trie2 = trie.insert("hello").insert("help").insert("heap");

      expect(trie2.containsPrefix("hel")).toBe(true);
      expect(trie2.containsPrefix("help")).toBe(true);
      expect(trie2.containsPrefix("helt")).toBe(false);
    });

    it("should find words with prefix", () => {
      const trie = new Trie();
      const trie2 = trie.insert("hello").insert("help").insert("heap").insert("world");

      const withHel = trie2.findWordsWithPrefix("hel");
      expect(withHel).toContain("hello");
      expect(withHel).toContain("help");
      expect(withHel).not.toContain("heap");
      expect(withHel).not.toContain("world");
    });

    it("should handle empty prefix", () => {
      const trie = new Trie();
      const trie2 = trie.insert("hello").insert("world");

      const allWords = trie2.findWordsWithPrefix("");
      expect(allWords).toContain("hello");
      expect(allWords).toContain("world");
    });
  });

  describe("edge cases", () => {
    it("should handle empty strings", () => {
      const trie = new Trie();
      const trie2 = trie.insert("");

      expect(trie2.contains("")).toBe(true);
      expect(trie2.containsPrefix("")).toBe(true);
    });

    it("should handle overlapping words", () => {
      const trie = new Trie();
      const trie2 = trie.insert("test").insert("testing");

      expect(trie2.contains("test")).toBe(true);
      expect(trie2.contains("testing")).toBe(true);
      expect(trie2.findWordsWithPrefix("test")).toEqual(["test", "testing"]);
    });
  });
});

describe("GeneralTree", () => {
  describe("basic operations", () => {
    it("should create an empty tree", () => {
      const tree = new GeneralTree<string>();
      expect(tree.size()).toBe(0);
      expect([...tree]).toEqual([]);
    });

    it("should insert root", () => {
      const tree = new GeneralTree<string>();
      const tree2 = tree.insert("root");

      expect(tree.size()).toBe(0); // Original unchanged
      expect(tree2.size()).toBe(1);
      expect([...tree2]).toEqual(["root"]);
    });

    it("should ignore second root insertion", () => {
      const tree = new GeneralTree<string>();
      const tree2 = tree.insert("root").insert("another");

      expect(tree2.size()).toBe(1);
      expect([...tree2]).toEqual(["root"]);
    });
  });

  describe("child operations", () => {
    it("should add children to root", () => {
      const tree = new GeneralTree<string>();
      const tree2 = tree.insert("root").insertChild("root", "child1").insertChild("root", "child2");

      expect(tree2.size()).toBe(3);
      const values = [...tree2];
      expect(values).toContain("root");
      expect(values).toContain("child1");
      expect(values).toContain("child2");
    });

    it("should add nested children", () => {
      const tree = new GeneralTree<string>();
      const tree2 = tree.insert("root").insertChild("root", "child1").insertChild("child1", "grandchild");

      expect(tree2.size()).toBe(3);
      expect([...tree2.levelOrder()]).toEqual(["root", "child1", "grandchild"]);
    });

    it("should handle non-existent parent", () => {
      const tree = new GeneralTree<string>();
      const tree2 = tree.insert("root").insertChild("nonexistent", "child");

      expect(tree2.size()).toBe(1);
      expect([...tree2]).toEqual(["root"]);
    });
  });

  describe("traversal", () => {
    it("should perform level-order traversal", () => {
      const tree = new GeneralTree<string>();
      const tree2 = tree
        .insert("root")
        .insertChild("root", "child1")
        .insertChild("root", "child2")
        .insertChild("child1", "grandchild1")
        .insertChild("child2", "grandchild2");

      const values = [...tree2.levelOrder()];
      expect(values[0]).toBe("root");
      expect(values.slice(1, 3)).toEqual(expect.arrayContaining(["child1", "child2"]));
      expect(values.slice(3)).toEqual(expect.arrayContaining(["grandchild1", "grandchild2"]));
    });
  });
});
