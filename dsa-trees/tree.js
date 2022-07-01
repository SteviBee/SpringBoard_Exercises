/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // // gives whole object
    // console.log("this ----------------------------------------", this);

    // // Gives root TreeNode class with val (variable) & children array
    // console.log("this  root ----------------------------------------", this.root);
    // // Returns 1
    // console.log("this root.val----------------------------------------", this.root.val);

    // NOT OK:
    // console.log("this.children----------------------------------------", this.children);
    // console.log("this ----------------------------------------", this[0]);
    // console.log("this ----------------------------------------", this.Tree);

    // Set varable & create an array from the root node
    let answer = 0;
    let toCountStack = [this.root]

    if (this.root === null) {
      return 0
    }

    // Conduct a depth-first approach to add items:
    while (toCountStack.length) {
      // Pop off the most recent node and add the value to the answer
      let current = toCountStack.pop()
      answer += current.val
      // console.log("CURRENT -------------------------,", current);
      // console.log("CURRENT VAL -------------------------,", current.val);

      // Add each node (val & children array) in the  parent's children array to the current stack
      for (let child of current.children) {
        // console.log("pushing", child);
        toCountStack.push(child)

      }

    }
    return answer
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let count = 0;
    let toCountStack = [this.root]

    // Empty array case
    if (this.root === null) {
      return 0
    }

    // Conduct a depth-first approach to add items:
    while (toCountStack.length) {
      // Pop off the most recent node and add the value to the answer
      let current = toCountStack.pop()
      if (current.val % 2 === 0) {
        count += 1
      }
      // console.log("CURRENT -------------------------,", current);
      // console.log("CURRENT VAL -------------------------,", current.val);

      // Add each node (val & children array) in the  parent's children array to the current stack
      for (let child of current.children) {
        // console.log("pushing", child);
        toCountStack.push(child)

      }

    }
    return count
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let count = 0;
    let toCountStack = [this.root]

    // Empty array case
    if (this.root === null) {
      return 0
    }

    // Conduct a depth-first approach to add items:
    while (toCountStack.length) {
      // Pop off the most recent node and add the value to the answer
      let current = toCountStack.pop()
      if (current.val > lowerBound) {
        count += 1
      }
      // console.log("CURRENT -------------------------,", current);
      // console.log("CURRENT VAL -------------------------,", current.val);

      // Add each node (val & children array) in the  parent's children array to the current stack
      for (let child of current.children) {
        // console.log("pushing", child);
        toCountStack.push(child)

      }

    }
    return count
  }
}

module.exports = { Tree, TreeNode };
