/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */
// FIFO - First In First Out
// GOAL - is to make a linkedlist ADT therefore able to have constant time for as mucha as possible
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let newNode = new Node(val)
    if (this.first === null) {
      this.first = newNode
      this.last = newNode
      this.size++
    } else {
      // Builds the queue (FIFO) by adding the new node onto the last node
      // Which allows us to POP / dequeue the First value last
      this.last.next = newNode
      this.size++
      this.last = newNode
    }

  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (!this.size) {
      throw new Error("empty queue!")
    }
    // Grab the old node, then we will remove it by re-referening the this.first node to next
    let temp = this.first

    // If the first value equals the last then the LL is empty so set all to null 
    if (this.first === this.last) {
      this.last = null
    } 
    
    // pop the old first node off by setting the new first node to the next dasiy-chain'ed node
    this.first = this.first.next
    this.size--
    return temp.val
    
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (this.first === null) {
      return null
    } else {
      return this.first.val
    }
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if (this.size === 0) {
      return true
    } else {
      return false
    }
  }
}

module.exports = Queue;
