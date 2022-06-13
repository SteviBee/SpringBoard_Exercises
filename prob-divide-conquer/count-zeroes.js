// let arr = [0,0,0,0,0]
// let arr = [1,1,1,1,1]
// Length 5, half is 0 with index of 2

function countZeroes(arr) {

    // // Linear time solution: O(n)
    // let ans = 0;
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] === 0) {
    //         ans++;
    //     }
    // }
    // return ans

    // Logrithmic solution: (PREFERED) O(log n)
    let leftIdx = 0
    let rightIdx = arr.length - 1

    while (leftIdx <= rightIdx) {
        let midInx = Math.floor((leftIdx + rightIdx) / 2)
        let midValue = arr[midInx];
 

        // Sucesscasse found first zero
        if (arr[midInx - 1] === 1 && midValue === 0) {
            return arr.length - midInx
        }
        // Sucesscasse found last one 
        if (arr[midInx + 1] === 0 && midValue === 1) {
            return arr.length - rightIdx
        }

        // sucesss no 0s return length as ans becauas arr is all 1s
        if (leftIdx + 1 === arr.length) {
            return 0
        }
        // sucesss no 1s return length as ans because arr is all 0s
        if (rightIdx - 1 < 0) {
            return arr.length
        }

        if (midValue > 0) {
            // focus on greater right side - [1,1,1,1,1,0,0,0] for i = 3 -> [1,1,0,0,0]
            leftIdx = midInx + 1
        

        } else if (midValue === 0) {
      

            // go down on right side
            rightIdx = midInx - 1

        }

        // } 
    }

    // else no zeros
    return arr.length

}
// console.log(countZeroes(arr));

module.exports = countZeroes