/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val)
    // Check if starting with empty LL therefore put head and tail -> newNode
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      // change current tailnext,on the LinkedList Object,  ->(to reference)-> newNode 
      this.tail.next = newNode
      // set *new* tail to newNode
      this.tail = newNode

    }
    this.length++

  }

  

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    // Create new node
    const newNode = new Node(val)

    // check if empty list and set both tail and head to newNode
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      // If one or more in list grab placeholder
    } else {
      // Otherwise grab the old head reference
      let placeholder = this.head
      // set the *new* head to the newNode
      this.head = newNode
      // Set the *new* head next value to old next value
      this.head.next = placeholder
    }

    // Incriement counter
    this.length++

  }

  /** pop(): return & remove last item. */
// Had trouble with this one. Used code from here: https://dev.to/miku86/javascript-data-structures-singly-linked-list-pop-1n94
  pop() {
    // no node in the list, therefore return null
    if (!this.length) {
      throw new Error("Invalid no items in linked lsit");
    } else {
      /*
       * find the second to last node (it should become the new tail):
       * - set the current head as currentNode (we always have to start from the List's head node)
       * - set the current head as secondToLastNode (we can't go back a node, therefore we have to save the second to last)
       * - as long as the current node has a next node (so it is not the last node)
       * - then set the current node to the second to last
       * - then set the current node's `next` as the current node
       */
      let currentNode = this.head;
      let secondToLastNode = this.head;
      while (currentNode.next) {
        secondToLastNode = currentNode;
        currentNode = currentNode.next;
      }
      // set the second to last node's `next` to `null` (the second to last should "cut" its connection to the next node)
      secondToLastNode.next = null;
      // set it as `tail`
      this.tail = secondToLastNode;
      // decrease the Singly Linked List's `length` by 1
      this.length -= 1;
      // if the Singly Linked List now is empty, set its `head` and `tail` to `null`
      if (!this.length) {
        this.head = null;
        this.tail = null;
      }
      // return the popped node (found some lines above)
      return currentNode.val;
    }
  }
  // POP - i was stuggling with. I was very close but couldn't figure it out and I will restart with the next few
  // pop() {
  //   // get the current value, answer and proir value:
  //   let current = this.head
  //   let priorNode = this.head
  //   let answer;

  //   // No node in list
  //   if (this.length === 0) {
  //     throw new Error("Invalid no items in linked lsit");
  //   }
  //   console.log("CURRENT NODE --------------------", current.next);
  //   // set new current to the next node and therefore read that value until null
  //   while (current.next !== null) {     
  //     // answer = current.next.val
  //     answer = current.val
  //     console.log("CURRENT VALUE --------------------", current.val);
  //     priorNode = current
  //     // Iterate the current value
  //     current = current.next
  //     this.length--
  //   }

  //   // Setting head and tail to null if last item in list in removed
  //   if (current.next === null) {
  //     answer = current.val
	// 		this.head = null
  //     this.tail = null 
  //     this.length--
  //   }
  //   // Set the current linkedlist tail to the new last node & Return value:
  //   // priorNode.next = null
  //   // this.tail = priorNode
    
  //   priorNode.next = null
  //   this.tail = priorNode

  //   return answer

  // }

  /** shift(): return & remove first item. Throws error if list is empty.*/

  shift() {

    if (!this.length) {
      throw new Error("No items in linked list")
    } else {
      // Grab current item and change this.head to next items
      let firstNode = this.head
      this.head = firstNode.next
      this.length--
      
      // if this.head is null then that means last item therefore set tail to null too
      if (!this.length) {
        this.head = null;
        this.tail = null;
      }
      return firstNode.val
    }

  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    let answer = this.head
    let currentNode = this.head
    let currentIndex = 0

    while (currentNode !== null) {     
  
      if (currentIndex === idx) {
        answer = currentNode.val
        return answer

      } else {
        currentIndex++
        answer = currentNode.next
        currentNode = currentNode.next        
      }
      
    }
    return answer

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    let currentNode = this.head
    let currentIndex = 0

    while (currentNode !== null) {     
  
      if (currentIndex === idx) {
        currentNode.val = val
        break

      } else {
        currentIndex++
        currentNode = currentNode.next        
      }
      
    }
    return null

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    let newNode = new Node(val)
    let currentNode = this.head
    let previousNode = this.head
    let currentIndex = 0

    // If empty list then change TAIL HEAD and LENGTH to be ref newNode
    if (!this.length) {
      this.head = newNode
      this.tail = newNode
      this.length++
    }

    // Case for inserting at end:
    if (idx === this.length) return this.push(val);

    // While we are not at the last node (null fo CN.next) set all params then check index-to-length, return if found
    while (currentNode !== null) {     
  
      if (currentIndex === idx) {
        previousNode.next = newNode
        newNode.next = currentNode
        this.length++  
        break

      } else {
        currentIndex++
        previousNode = currentNode
        currentNode = currentNode.next        
      }
      
    }
    return null
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let answer = this.head
    let nextNode = this.head.next
    let previousNode = this.head
    let currentNode = this.head
    let currentIndex = 0

    // TODO Look for one item list
    if (nextNode === null ) {
      this.tail = null
      this.head = null
      this.length--
      return null
    }

    while (currentNode !== null) {     
  
      if (currentIndex === idx) {
        answer = currentNode
        previousNode.next = nextNode
        this.length--
        break

      } else {
        currentIndex++
        previousNode = currentNode
        nextNode = currentNode.next.next
        currentNode = currentNode.next        
      }
      
    }
    return answer

  }

  /** average(): return an average of all values in the list */

  average() {

    let currentNode = this.head
    let nextNode = this.head
    let totalValue = 0
    let totalInstances = this.length

    if (!this.length) {
      return 0
    }

    if (this.length === 1) {
      return currentNode.val
    }

    while (currentNode !== null) {
      totalValue = totalValue + currentNode.val
      currentNode = currentNode.next
    }

    return totalValue / totalInstances
    
  }
}

module.exports = LinkedList;
