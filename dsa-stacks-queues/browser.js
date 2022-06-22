/***Browser Back/Forward
Design how you could design a browser back/forward system using two stacks,
that you can visit a series of sites (Google, Yahoo, EBay, go back to Yahoo,
then forward again to EBay, then onto Apple, and so on).

Write pseudo-code for this. */

const Stack = require('./stack.js')
const Queue = require('./queue.js')

let browserStack = new Stack()
let browserStackBackwards = new Stack()
let queue = new Queue()

// PSEUDO-CODE: forward - visiting a site triggers an event and captures the current URL
// PSEUDO-CODE: That URL is added to the stack via:
browserStack.push("URL_FROM_EVENT_FORWARD")

// PSEUDO: if you go backwards then add ot he backwards stack:
browserStackBackwards.push("URL_FROM_EVENT_BACKWARDS")

// PSEUDO: Anytime either one figures provide that URL and remove it:
let url_to_go = browserStack.pop()
console.log(url_to_go);

// // LIFO
// newStack.push("testSite1")
// newStack.push("testSite2")
// newStack.push("testSite3")
// newStack.push("testSite4")

// console.log(newStack)

// // FIFO
// queue.enqueue("test1")
// queue.enqueue("test2")
// queue.enqueue("test3")
// queue.dequeue()
// console.log(queue)