/*** 
 * 
 * Write a function called findRotationCount which accepts an array of distinct numbers 
 * sorted in increasing order. The array has been rotated counter-clockwise n number of times. 
 * Given such an array, find the value of n.

Constraints:

Time Complexity: O(log N)

Examples:

findRotationCount([15, 18, 2, 3, 6, 12]) // 2
findRotationCount([7, 9, 11, 12, 5]) // 4
findRotationCount([7, 9, 11, 12, 15]) // 0 */

// TRY to find where arr[i] > arr[i + 1] -> call startOfRotation

function findRotationCount(arr) {
    // let rotations = 0;

    //   initial zero rotations case:
    if (arr[0] < arr[arr.length - 1]) {
        return 0
    }
    // console.log(findPivot(arr));
    return findPivot(arr)
    /** // Linear Time - O(n) method 
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {          
            rotations++
            break
        } else {        
            rotations++
        }
    }
    */
    // return rotations
}

function findPivot(arr) {
    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;
    let start = 0
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2)
        // If it is in order then return the pivot / the rotation count!
        // because the if below means it found the begining
        if (arr[mid] > arr[mid + 1]) return mid + 1
        // If not, then focus left side or right side depending on mid value to start val
        else if (arr[start] <= arr[mid]) {
            start = mid + 1
          } else {
            end = mid - 1
          }
    }
    
}


console.log(findRotationCount([15, 18, 2, 3, 6, 12])) // 2
module.exports = findRotationCount