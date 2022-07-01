/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  // Go breath-first to find mindepth
  minDepth() {
    // Need some way to count depths of the tree
    // Need some way to compare smallest coutn-of-depth
    let minDepth = 0;
    let nodeCount = 0;
    // Set queue equal to entire root
    let toCountQueue = [this.root]
    
    // Empty array case
    if (this.root === null) {
      return 0
    }

    // Conduct a depth-first approach 
    while (1 == 1) {
      // Shift (from start) off the most recent node and add do stuff with it
      // REMOVING items from stack 
      minDepth = toCountQueue.length
     
      // EXIT CASE - When counter is zero return answer + 1 for current node
      if (nodeCount === 0) {
        return minDepth + 1
      }
      minDepth++

      // Checking left / right, IF left is not null then push that obj to
      // the queue to be checked eventually as well. Iterate down
      while (nodeCount > 0) {
        let newNode = toCountQueue.shift()
        console.log("CHECKING --------------------", newNode);
        if (newNode.left != null) {
          toCountQueue.push(newNode.left)
        }
        if (newNode.right != null) {
          toCountQueue.push(newNode.right)
        }
        nodeCount--
      }
      // LEAVING MY OLD NOT WORKING CODE TO SEE WHAT NOT TO DO
      // if (current.left === null && current.right === null) return 1;
      // console.log("Current LOG ----------------", current);
      // console.log("Current LEFT ----------------", current.left);


      // // Add each node (val & children array) in the  parent's children array to the current stack
      // for (let key in current.left) {
      //   console.log("Key push", key);
      //   console.log("pushing", current.left[key]);
      //   toCountQueue.push(current.left[key])

      // }

    }

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0

    // Recusively check for max depth
    function maxDepthRecursive(node) {

      if (node.left === null && node.right === null) return 1  
      if (node.left === null) {
          return maxDepthRecursive(node.right) + 1
      }  
      if (node.right === null) {
          return maxDepthRecursive(node.left) + 1
      }  

      // Return the recused values with the max showing
      return Math.max(maxDepthRecursive(node.left), maxDepthRecursive(node.right)) + 1
    
    }

    // Remember - recusive functions are called multiple times and left open,
    // Then when one finishes it starts a waterfall effect and finishes them all
    // Kick it off
    return maxDepthRecursive(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (this.root === null) return 0;
    let result = 0;

    // Create recusive helper function that takes a node
    // And returs itself but will have a base case of:
    //    1 - the maximum of adding the previous value, current node.val, and left and right sums
    //    2 - finally kick it off with the return 
    function maxSumRecursive(node) {
      if (node === null) return 0
      const leftSum = maxSumRecursive(node.left)
      const rightSum = maxSumRecursive(node.right)

      result = Math.max(result, node.val + leftSum + rightSum)
      return Math.max(0, leftSum + node.val, rightSum + node.val)
      
    }
    maxSumRecursive(this.root)
    return result
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    // let's use BFS for this!
    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let shouldReassignClosest = currentVal < closest || closest === null;

      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
