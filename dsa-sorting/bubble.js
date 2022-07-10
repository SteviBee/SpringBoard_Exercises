/**BubbleSort Pseudocode
Loop with i from end of array towards beginning
Loop with j from the beginning until i - 1
If arr[j] is greater than arr[j+1], swap those two values!
Return the sorted array
 */

function bubbleSort(arr) {
    // let result = []
    // 1st loop - controls total array length to go through and how many loops to do
    for (let i = arr.length; i > 0; i--) {
        // 2nd loop actually compares all values & placeholder for swapped
         
        let swapped = false
        for (let j = 0; j < arr.length - 1; j++) {           
            
            // If downsteam is greater swap - b/c we want all values in sorted
            if (arr[j] > arr[j+1]) {
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                swapped = true
            }
            
        }
        // If swapped is still false then no swap happened and array is sorted
        if (!swapped) {
            return arr
        }
        
    }
    return arr

}





module.exports = bubbleSort;