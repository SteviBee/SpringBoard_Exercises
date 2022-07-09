class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {

    // If the tree is empty, insert at root
    if (this.root === null) {
      let newNode = new Node(val)
      this.root = newNode
      return this
    }

    // placeholder - for current value, creat infinate loop that runs through current
    let current = this.root
    // Otherwise, find the correct spot for the new node
    // Try less than (left), or greater than (right)
    while (true) {
      // check if root is empty then make val if it is,
      if (val < current.val) {
        // if no left node then create nn and insert, return entire object, done
        // Really this is saying - "IS THIS THE END B/C current.left === null"
        if (current.left === null) {
          let newNode = new Node(val)
          current.left = newNode
          // END LOOP - by returning
          return this
          // else - keep searching for end of the node
          //  IF NOT END - move down left side
        } else {
          current = current.left
        }

      } else if (val > current.val) {
        // RIGHT side, check if exist if not create nn, if so then move current down one to right
        if (current.right === null) {
          current.right = new Node(val)
          return this

        } else {
          // move down one by setting current to new node
          current = current.right
        }

      }

    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  // need to collect all current values as the recursive functino is passed
  insertRecursively(val, current = this.root) {
    // STRAT
    // 1st - check if  val < or > and go left or right respectively
    // 2nd - check if end of line or not, and create or call fn again

    // Take val and output this (with newNode) and break, or recursive


    // Check if empty and if so create new node:
    if (current === null) {
      this.root = new Node(val)

      return this
    }

    // go left
    if (val < current.val) {
      // if true then end of road and create and return
      if (current.left === null) {
        current.left = new Node(val)

        return this
      }
      current = current.left
      return this.insertRecursively(val, current)

    } else if (val > current.val) {
      // if true go right
      if (current.right === null) {
        current.right = new Node(val)

        return this
      }
      current = current.right
      return this.insertRecursively(val, current)

    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    let current = this.root
    while (true) {

      // Edge Cases
      if (this.root === null) {

        return undefined
      }
      if (current === null) {

        return undefined
      }

      // Base case / answer
      if (current.val === val) {
        return current
      } else if (current.val > val) {
        if (current.left === null) {

          return undefined
        } else {

          current = current.left
        }
      } else if (current.val < val)
        if (current.right === null) {

          return undefined
        } else {

          current = current.right
        }
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {

    // compare value to current
    if (current === null) {
      return undefined
    } else if (val === current.val) {
      return current
    } else if (val < current.val) {
      current = current.left
      // if (current.left === null) {
      //   return undefined
      // }
    } else if (val > current.val) {
      current = current.right
      // if (current.right === null) {
      //   return undefined
      // }
    }

    return this.findRecursively(val, current)

    // if not found then call function

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  // Depth first search allows you to search WITHOUT looking at all nodes

  dfsPreOrder() {
    // STRAT
    // 1st - go through all values and add in correct order
    // 2nd - add to array and return when gone through all
    let answer = []

    // Recursively going through all nodes
    const traverse = (node) => {
      answer.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right)
    }

    traverse(this.root)
    return answer
    // pre order:
    // log, left, right
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    // in order:
    // left, log right
        // STRAT
    // 1st - go through all values and add in correct order
    // 2nd - add to array and return when gone through all
    let answer = []

    // Recursively going through all nodes
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      answer.push(node.val);
      if (node.right) traverse(node.right)
    }

    traverse(this.root)
    return answer
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    // post order:
    // left, right, log, 
        // STRAT
    // 1st - go through all values and add in correct order
    // 2nd - add to array and return when gone through all
    let answer = []

    // Recursively going through all nodes
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right)
      answer.push(node.val);
    }

    traverse(this.root)
    return answer
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
// Breath first search - use QUEUE (FIFO) / shift
bfs() {
  // Create first node, queue (FIFO), and answer
  let node = this.root;
  let queue = [];
  let data = [];

  // Add root to queue which should be entire BST
  queue.push(node);

  // Where there are items in the queue iterate through them
  // 1st - shift first item off, and add value to answer, and remove from queue
  // 2nd - build more queue from left and right children if they exisit 
  // 3rd - repeat while loop until queue empty
  while (queue.length) {
    node = queue.shift();
    data.push(node.val);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }

  return data;
}

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

  }
}

module.exports = BinarySearchTree;
