// add whatever parameters you deem necessary
// OUTPUT: negative first and postive last array of numbers
function separatePositive(arr) {
    
    let left = 0
    let right = arr.length - 1

    while (left <= right) {
        // if (left === right) {
        //     if (arr[left] < 0) {
        //         answer.unshift(arr[left])
        //     } else {
        //         answer.push(arr[left])
        //     }
        //     console.log("ANSER", answer);
        //     return answer
        // }

        // While the values are both positive
        if (arr[left] < 0 && arr[right] > 0) {
            // sawp values and move indexes closer towards each other
            let temp = arr[left]
            arr[left] = arr[right]
            arr[right] = temp
            right--
            left++                   
        } else {
            // determine which one postive and move that index closer to hopefully find a postive
            if (arr[left] > 0 ) {
                left +=1
            } else {
                right -=1
            }
        }
    } 

    console.log("ANSER", arr);
    return arr
}

module.exports = separatePositive