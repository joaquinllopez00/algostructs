# Algostructs

A zero-dependency TypeScript implementation of essential data structures and algorithms missing from JavaScript.

## Features

- 🎯 **Type-Safe**: Full TypeScript support with generics
- 🔄 **Immutable**: All operations return new instances
- 🚀 **Efficient**: Optimized implementations of classic algorithms
- 📦 **Zero Dependencies**: Pure TypeScript/JavaScript implementation
- 🧪 **Well-Tested**: Comprehensive test coverage

## Installation

```bash
npm install algostructs

## Usage

### Priority Queue & Heaps
```

import { MinHeap, MaxHeap, PriorityQueue } from 'algostructs';

// Create a min heap const minHeap = new MinHeap<number>(); const heap2 = minHeap.add(5).add(3).add(7);
console.log(heap2.peek()); // 3

// Custom priority queue interface Task { priority: number; name: string; }

const taskQueue = new PriorityQueue<Task>((a, b) => a.priority - b.priority); const queue2 = taskQueue.enqueue({
priority: 1, name: 'Important task' });

```

### Linked Lists

```

import { LinkedList, DoublyLinkedList } from 'algostructs';

// Singly linked list const list = new LinkedList<number>(); const list2 = list.prepend(1).append(2).prepend(0);

// Doubly linked list with reverse iteration const dlist = new DoublyLinkedList<number>(); const dlist2 =
dlist.append(1).append(2).append(3); for (const item of dlist2.reverseIterator()) { console.log(item); // 3, 2, 1 }

```

### Trees

```

import { BinarySearchTree, Trie } from 'algostructs';

// Binary Search Tree const bst = new BinarySearchTree<number>(); const bst2 = bst.insert(5).insert(3).insert(7);

// Trie for prefix searching const trie = new Trie(); const trie2 = trie .insert("hello") .insert("help")
.insert("world"); console.log(trie2.findWordsWithPrefix("hel")); // ["hello", "help"]

```

### Searching

import { Searching } from 'algostructs';

const arr = [1, 2, 3, 4, 5];
const result = Searching.binarySearch(arr, 3);
console.log(result); // { element: 3, index: 2, comparisons: 2 }

// Smart search that picks the best algorithm
const smartResult = Searching.search(arr, 3);

import { Sorting } from 'algostructs';

### Sorting

const arr = [3, 1, 4, 1, 5, 9];
const sorted = Sorting.quickSort(arr);
console.log(sorted); // [1, 1, 3, 4, 5, 9]

// Use optimal sorting based on array size
const smartSorted = Sorting.sort(arr);

## Key Benefits

1. Immutable Operations: All operations return new instances, making your code more 2. predictable and easier to reason about.
3. Type Safety: Comprehensive TypeScript definitions help catch errors at compile time.
4. Performance Optimized: Implementations follow best practices for performance.
5. Memory Efficient: Careful memory management in all operations.

### Documentation
Each data structure and algorithm includes:

Usage examples
Type definitions
Comprehensive JSDoc comments

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

License
MIT © [Joaquin Lopez]
```
