class Tree {

    constructor(root) {
      this.root = root;
    }
// USE:
// let org = new Tree(
//     new Node("amy",
//       [new Node("bob"),
//        new Node("barb"),
//        new Node("barry")]))

find(val) {
    let toVisitStack = [this];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current.val === val) 
        return current;

      for (let child of current.children) 
        toVisitStack.push(child)
    }
  }

  findBFS(val) {
    let toVisitQueue = [this];

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if (current.val === val) 
        return current;

      for (let child of current.children) 
        toVisitQueue.push(child)
    }
  }

}

// ORRRRR ---------
class Tree {
    constructor(root) {
      this.root = root;
    }
  
    /** findInTree: return node in tree w/this val */
  
    findInTree(val) {
      return this.root.find(val)
    }
  
    /** findInTreeBFS: return node in tree w/this val */
  
    findInTreeBFS(val) {
      return this.root.findBFS(val)
    }
  }