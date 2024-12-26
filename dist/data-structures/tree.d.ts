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
export declare class BinarySearchTree<T> {
    private root;
    private _size;
    /**
     * Creates a new empty Binary Search Tree
     */
    constructor();
    /**
     * Creates a new tree with an element inserted
     *
     * @param value - Element to insert
     * @returns A new BST with the element inserted
     */
    insert(value: T): BinarySearchTree<T>;
    /**
     * Creates a new tree with an element removed
     *
     * @param value - Element to remove
     * @returns A new BST with the element removed
     */
    remove(value: T): BinarySearchTree<T>;
    /**
     * Checks if a value exists in the tree
     */
    contains(value: T): boolean;
    /**
     * Returns the size of the tree
     */
    size(): number;
    /**
     * Makes the tree iterable (inorder traversal)
     */
    [Symbol.iterator](): Iterator<T>;
    private inorderTraversal;
    private insertNode;
    private removeNode;
    private findNode;
    private findMin;
    private calculateSize;
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
export declare class Trie {
    private root;
    /**
     * Creates a new empty Trie
     */
    constructor();
    /**
     * Creates a new trie with a word inserted
     *
     * @param word - Word to insert
     * @returns A new Trie with the word inserted
     */
    insert(word: string): Trie;
    /**
     * Checks if a word exists in the trie
     *
     * @param word - Word to search for
     * @returns true if the word exists
     */
    contains(word: string): boolean;
    /**
     * Checks if any word in the trie starts with the given prefix
     *
     * @param prefix - Prefix to search for
     * @returns true if any word starts with the prefix
     */
    containsPrefix(prefix: string): boolean;
    /**
     * Finds all words that start with the given prefix
     *
     * @param prefix - Prefix to search for
     * @returns Array of words with the given prefix
     */
    findWordsWithPrefix(prefix: string): string[];
    private findNode;
    private collectWords;
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
export declare class GeneralTree<T> {
    private root;
    private _size;
    /**
     * Creates a new empty General Tree
     */
    constructor();
    /**
     * Creates a new tree with a root value
     *
     * @param value - Root value to insert
     * @returns A new GeneralTree with the root value
     */
    insert(value: T): GeneralTree<T>;
    /**
     * Creates a new tree with a child added to the specified parent
     *
     * @param parentValue - Value of the parent node
     * @param childValue - Value to insert as child
     * @returns A new GeneralTree with the child added
     */
    insertChild(parentValue: T, childValue: T): GeneralTree<T>;
    /**
     * Returns the size of the tree
     */
    size(): number;
    /**
     * Performs a breadth-first traversal of the tree
     */
    levelOrder(): IterableIterator<T>;
    /**
     * Makes the tree iterable (level-order traversal)
     */
    [Symbol.iterator](): IterableIterator<T>;
    private insertChildNode;
    private calculateSize;
}
