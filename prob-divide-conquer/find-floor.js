/**
 * Write a function called findFloor which accepts a sorted array and a value x, 
 * and returns the floor of x in the array. 
 * The floor of x in an array is the largest element in the array 
 * which is smaller than or equal to x. If the floor does not exist, return -1.

Examples:

findFloor([1,2,8,10,10,12,19], 9) // 8
findFloor([1,2,8,10,10,12,19], 20) // 19
findFloor([1,2,8,10,10,12,19], 0) // -1 */

function findFloor(arr, num) {
    let start = 0;
    let end = arr.length - 1;

    // fail fast cases
    if (arr.length === 0) return -1;
    if (num < arr[start]) return -1;

    // interative approcah - divide and concur 
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        console.log("start", start, "end", end, "mid", mid, "midval", arr[mid]);
        if (arr[mid]=== num) {
            return arr[min]
        }

        // Success! IF value is less than num AND next falu is great than num - START
        if (arr[mid] < num && arr[mid+1] > num) {
            console.log("success end?", arr[mid]);
            return arr[mid];
        }
        // if divide result is less than the num and the arr.length is almost done being checked
        if (arr[mid] < num && mid === arr.length - 1) {
            console.log("success  end ALL?", arr[mid]);
            return arr[mid];
        }

        if (num < arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return -1;

}

// 8
console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 20))

module.exports = findFloor