/*** Write an algorithm that, given a number of people, 
 * and the “skip”, which person will be the survivor.*/
const Stack = require('./stack.js')
const Queue = require('./queue.js')
const LinkedList = require('../dsa-arrays-linked-lists-solution/linked-list')

// NOT CORRECT - COULDN"T FIGURE OUT
const find_survivor = (numPeople, skip) => {
    let linkedList = new LinkedList()
    let ans = 0;
    let i = 1
    // Constucting LL
    while (i <= numPeople) {
        linkedList.push(i)
        i++
    }
    // UNSURE HOW TO LINK CICULUAR LL
    linkedList.tail.next = linkedList.head


    function findingKiller(skip) {
        let x = 0

        for (let j = 0; j < linkedList.length; j++) {
            console.log("n is: ", j);
            console.log("final LL", linkedList);
            if (linkedList.length === 1) {
                ans = linkedList.pop()
                console.log("answer__________________!!!______",ans)
            } else {
                if (linkedList._get(j).val % skip === 0) {
                    console.log("removing: ", linkedList.removeAt(j))
                }
            }
        }
        findingKiller()
        


        //     if (linkedList.length === 1) {
        //         console.log("answer", linkedList.pop())
        //     } else {
        //         console.log("run above for");
        //         // for (let j = 0; j < linkedList.length; j++) {
        //         //     console.log("CALLED INSIDE");
        //         //     if (linkedList._get(j).val % skip === 0) {
        //         //         console.log("removing: ", linkedList.removeAt(j))
        //         //     }
        //         //     // console.log("Get", linkedList._get(j));
        //         // }

        //         if (linkedList._get(x).val % skip === 0) {
        //             linkedList.removeAt(x)
        //             x++
        //         } else {             
        //             x++
        //             findingKiller()
        //         }

        //     }

        // }
    }
    // findingKiller(skip)
    return ans;
}




find_survivor(10, 3) // 4