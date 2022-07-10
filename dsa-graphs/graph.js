class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    // 1st - add to graph
    this.nodes.add(vertex)

  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let i = 0; i < vertexArray.length; i++) {
      this.nodes.add(vertexArray[i])
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)
    // loop thru the known nodes, then check if in current node adjusecnt and dlete
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        // remove
        node.adjacent.delete(vertex)
      }
     
    }

  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // create stack (LIFO) toVisit ((b/c want to go down)) and storage for seen
    // Populate stack with 'start' input node/vertices and seen is empty
    let toVisitStack = [start]
    let ansArray = []
    let seenSet = new Set()
    let currentNode;
    // console.log("START TO VISIT", toVisitStack);

    // Add first starting value to seen set
    seenSet.add(start)

    // loop while still nodes to visit, pop() toVisit as current b/c LIFO
    while (toVisitStack.length) {
      currentNode = toVisitStack.pop()
      // OPTIONAL - Add critera like search or value
      //  For this exercise - we add to the array up here because we need ALL values
      // If this was down in the for-loop we would be one short b/c we would break the loop prior to adding
      ansArray.push(currentNode.value)
      
      // Then loop through current's adjacent node set and if not in seen set:
      // 1 - add adjacent nodes to toVisit Stack, and 2 - add them in seen set and 3 - add to answer
      for (let key of currentNode.adjacent) {
        if (!seenSet.has(key)) {
          
          toVisitStack.push(key)    
          // KEY CONCEPT- we must ADD the adjacent nodes to the seenset
          // so we don't double count nodes toVisit b/c nodes can be referenced by
          // many other nodes. Sets tho are unique
          seenSet.add(key)
        }
        
      }

    }
    
    return ansArray;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) { 
      // create stack (LIFO) toVisit ((b/c want to go down)) and storage for seen
    // Populate stack with 'start' input node/vertices and seen is empty
    let toVisitStack = [start]
    let ansArray = []
    let seenSet = new Set()
    let currentNode;
    

    // Add first starting value to seen set
    seenSet.add(start)

    // loop while still nodes to visit, unshift() toVisit as current b/c FIFO
    while (toVisitStack.length) {
      currentNode = toVisitStack.shift()      
      // OPTIONAL - Add critera like search or value
      //  For this exercise - we add to the array up here because we need ALL values
      // If this was down in the for-loop we would be one short b/c we would break the loop prior to adding
      ansArray.push(currentNode.value)
      
      // Then loop through current's adjacent node set and if not in seen set:
      // 1 - add adjacent nodes to toVisit Stack, and 2 - add them in seen set and 3 - add to answer
      for (let key of currentNode.adjacent) {
        if (!seenSet.has(key)) {
          
          toVisitStack.push(key)    
          // KEY CONCEPT- we must ADD the adjacent nodes to the seenset
          // so we don't double count nodes toVisit b/c nodes can be referenced by
          // many other nodes. Sets tho are unique
          seenSet.add(key)
        }
        
      }

    }
    
    return ansArray;
  }
}

module.exports = { Graph, Node }