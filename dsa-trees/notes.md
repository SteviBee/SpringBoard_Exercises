    console.log
      this ---------------------------------------- Tree {
        root: TreeNode { val: 1, children: [ [TreeNode], [TreeNode], [TreeNode] ] }
      }

      at Tree.sumValues (tree.js:19:13)

    console.log
      this  root ---------------------------------------- TreeNode {
        val: 1,
        children: [
          TreeNode { val: 2, children: [] },
          TreeNode { val: 3, children: [] },
          TreeNode { val: 4, children: [Array] }
        ]
      }

      at Tree.sumValues (tree.js:22:13)

    console.log
      this root.val---------------------------------------- 1