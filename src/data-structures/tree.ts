/**
 * Basic node interface for binary trees
 * @template T The type of value stored in the node
 */
interface BinaryNode<T> {
  readonly value: T;
  readonly left: BinaryNode<T> | null;
  readonly right: BinaryNode<T> | null;
}

/**
 * Node interface for general trees (n-ary trees)
 * @template T The type of value stored in the node
 */
interface TreeNode<T> {
  readonly value: T;
  readonly children: TreeNode<T>[];
}

/**
 * Node interface for trie (prefix tree)
 */
interface TrieNode {
  isEndOfWord: boolean;
  children: Map<string, TrieNode>;
}

/**
 * A functional Binary Search Tree implementation.
 * All operations create new instances, preserving immutability.
 *
 * @template T The type of elements in the tree
 * @example
 * ```typescript
 * const bst = new BinarySearchTree<number>();
 * const bst2 = bst.insert(5).insert(3).insert(7);
 * const bst3 = bst2.remove(3);
 * ```
 */
export class BinarySearchTree<T> {
  private root: BinaryNode<T> | null;
  private _size: number;

  /**
   * Creates a new empty Binary Search Tree
   */
  constructor() {
    this.root = null;
    this._size = 0;
  }

  /**
   * Creates a new tree with an element inserted
   *
   * @param value - Element to insert
   * @returns A new BST with the element inserted
   */
  insert(value: T): BinarySearchTree<T> {
    const tree = new BinarySearchTree<T>();
    tree.root = this.insertNode(this.root, value);
    tree._size = this._size + 1;
    return tree;
  }

  /**
   * Creates a new tree with an element removed
   *
   * @param value - Element to remove
   * @returns A new BST with the element removed
   */
  remove(value: T): BinarySearchTree<T> {
    const tree = new BinarySearchTree<T>();
    tree.root = this.removeNode(this.root, value);
    tree._size = this.calculateSize(tree.root);
    return tree;
  }

  /**
   * Checks if a value exists in the tree
   */
  contains(value: T): boolean {
    return this.findNode(this.root, value) !== null;
  }

  /**
   * Returns the size of the tree
   */
  size(): number {
    return this._size;
  }

  /**
   * Makes the tree iterable (inorder traversal)
   */
  *[Symbol.iterator](): Iterator<T> {
    yield* this.inorderTraversal(this.root);
  }

  private *inorderTraversal(node: BinaryNode<T> | null): Generator<T> {
    if (node) {
      yield* this.inorderTraversal(node.left);
      yield node.value;
      yield* this.inorderTraversal(node.right);
    }
  }

  private insertNode(node: BinaryNode<T> | null, value: T): BinaryNode<T> {
    if (!node) {
      return { value, left: null, right: null };
    }

    if ((value < node.value) as any) {
      return { ...node, left: this.insertNode(node.left, value) };
    } else {
      return { ...node, right: this.insertNode(node.right, value) };
    }
  }

  private removeNode(node: BinaryNode<T> | null, value: T): BinaryNode<T> | null {
    if (!node) return null;

    if ((value < node.value) as any) {
      return { ...node, left: this.removeNode(node.left, value) };
    } else if ((value > node.value) as any) {
      return { ...node, right: this.removeNode(node.right, value) };
    }

    // Node to delete found
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    // Node has two children
    const minNode = this.findMin(node.right);
    return {
      value: minNode.value,
      left: node.left,
      right: this.removeNode(node.right, minNode.value),
    };
  }

  private findNode(node: BinaryNode<T> | null, value: T): BinaryNode<T> | null {
    if (!node) return null;
    if (value === node.value) return node;
    return ((value < node.value) as any) ? this.findNode(node.left, value) : this.findNode(node.right, value);
  }

  private findMin(node: BinaryNode<T>): BinaryNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  private calculateSize(node: BinaryNode<T> | null): number {
    if (!node) return 0;
    return 1 + this.calculateSize(node.left) + this.calculateSize(node.right);
  }
}

/**
 * A functional Trie (prefix tree) implementation.
 * Optimized for string operations like prefix matching and autocompletion.
 *
 * @example
 * ```typescript
 * const trie = new Trie();
 * const trie2 = trie.insert("hello").insert("help");
 * console.log(trie2.containsPrefix("hel")); // true
 * ```
 */
export class Trie {
  private root: TrieNode;

  /**
   * Creates a new empty Trie
   */
  constructor() {
    this.root = { isEndOfWord: false, children: new Map() };
  }

  /**
   * Creates a new trie with a word inserted
   *
   * @param word - Word to insert
   * @returns A new Trie with the word inserted
   */
  insert(word: string): Trie {
    const trie = new Trie();
    trie.root.children = new Map(this.root.children);

    let current = trie.root;
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, {
          isEndOfWord: false,
          children: new Map(),
        });
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;

    return trie;
  }

  /**
   * Checks if a word exists in the trie
   *
   * @param word - Word to search for
   * @returns true if the word exists
   */
  contains(word: string): boolean {
    const node = this.findNode(word.toLowerCase());
    return node !== null && node.isEndOfWord;
  }

  /**
   * Checks if any word in the trie starts with the given prefix
   *
   * @param prefix - Prefix to search for
   * @returns true if any word starts with the prefix
   */
  containsPrefix(prefix: string): boolean {
    return this.findNode(prefix.toLowerCase()) !== null;
  }

  /**
   * Finds all words that start with the given prefix
   *
   * @param prefix - Prefix to search for
   * @returns Array of words with the given prefix
   */
  findWordsWithPrefix(prefix: string): string[] {
    const words: string[] = [];
    const node = this.findNode(prefix.toLowerCase());

    if (node) {
      this.collectWords(node, prefix.toLowerCase(), words);
    }

    return words;
  }

  private findNode(prefix: string): TrieNode | null {
    let current = this.root;
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }
    return current;
  }

  private collectWords(node: TrieNode, prefix: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, prefix + char, words);
    }
  }
}

/**
 * A functional General Tree (n-ary tree) implementation.
 * Allows any number of children per node.
 *
 * @template T The type of elements in the tree
 * @example
 * ```typescript
 * const tree = new GeneralTree<string>();
 * const tree2 = tree.insert("root")
 *   .insertChild("root", "child1")
 *   .insertChild("root", "child2");
 * ```
 */
export class GeneralTree<T> {
  private root: TreeNode<T> | null;
  private _size: number;

  /**
   * Creates a new empty General Tree
   */
  constructor() {
    this.root = null;
    this._size = 0;
  }

  /**
   * Creates a new tree with a root value
   *
   * @param value - Root value to insert
   * @returns A new GeneralTree with the root value
   */
  insert(value: T): GeneralTree<T> {
    if (this.root) {
      return this; // Already has a root
    }
    const tree = new GeneralTree<T>();
    tree.root = { value, children: [] };
    tree._size = 1;
    return tree;
  }

  /**
   * Creates a new tree with a child added to the specified parent
   *
   * @param parentValue - Value of the parent node
   * @param childValue - Value to insert as child
   * @returns A new GeneralTree with the child added
   */
  insertChild(parentValue: T, childValue: T): GeneralTree<T> {
    const tree = new GeneralTree<T>();
    tree.root = this.insertChildNode(this.root, parentValue, childValue);
    tree._size = this.calculateSize(tree.root);
    return tree;
  }

  /**
   * Returns the size of the tree
   */
  size(): number {
    return this._size;
  }

  /**
   * Performs a breadth-first traversal of the tree
   */
  *levelOrder(): IterableIterator<T> {
    if (!this.root) return;

    const queue: TreeNode<T>[] = [this.root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      yield node.value;
      queue.push(...node.children);
    }
  }

  /**
   * Makes the tree iterable (level-order traversal)
   */
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this.levelOrder();
  }

  private insertChildNode(node: TreeNode<T> | null, parentValue: T, childValue: T): TreeNode<T> | null {
    if (!node) return null;

    if (node.value === parentValue) {
      return {
        ...node,
        children: [...node.children, { value: childValue, children: [] }],
      };
    }

    return {
      ...node,
      children: node.children.map((child) => this.insertChildNode(child, parentValue, childValue) || child),
    };
  }

  private calculateSize(node: TreeNode<T> | null): number {
    if (!node) return 0;
    return 1 + node.children.reduce((sum, child) => sum + this.calculateSize(child), 0);
  }
}
