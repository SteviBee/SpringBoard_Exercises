/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */
// LIFO - Stacking pancakes

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */
// LIFO
  push(val) {
    let newNode = new Node(val)
    if (this.first === null) {
      this.first = newNode
      this.last = newNode
      this.size++
    } else {
      // building the stack from top down - LIFO
      let temp = this.first
      this.first = newNode
      this.first.next = temp
      this.size++
    }

    return undefined
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (!this.size) {
      throw new Error("empty queue!")
    }
    let temp = this.first

    if (this.first === this.last) {
      this.last = null;      
    } 
    // "pops" the old this.first value by setting the new this.first to the next node 
    // in the daisy-chained linkedlist. 
    // Returns the old this.first value
    this.size--
    this.first = this.first.next
    return temp.val
    

  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if (this.size === 0) {
      return true
    } else {
      return false
    }
  }
}

module.exports = Stack;
