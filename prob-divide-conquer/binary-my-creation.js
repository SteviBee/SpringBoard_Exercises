let arr = [1,2,3,4]
let val = 2


function binaryS(arr, val) {
    let start = 0;
    let end = arr.length -1;

    // The false statement is when END is less than start or START is greater than end
    // this happens if the value is not in the array:
    //              E S
    //             [1,2,3,4], find 5 
    while (start <= end) {
        // find middle / pivot, then divide results into two halves based on target value
        // middleIdx moves with the change in start / end
        let middleIdx = Math.floor((start + end) / 2)
        let middleValue = arr[middleIdx]

        // Check if middleValue is above pivot, if yes then focus larger, right side
        if (middleValue < val) {
            start = middleIdx + 1;
 
        } else if (middleValue > val) {
            // if middle value is greater than target value then focus smaller, left side
            end = middleValue - 1;
            // bring the end down
        } else {
            // else we found our value!!
            return middleIdx
        }
    }

    // If we finish the while loop (break out) and never return anything
    // then that means the value is not in the array therefore return -1
    return -1
}

console.log(binaryS(arr, val))