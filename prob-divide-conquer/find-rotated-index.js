// FIND - Where arr[i] > arr[i+1] => call it startingIndex



function findRotatedIndex(arr, val) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];
        // console.log("left", leftIdx, "right", rightIdx, "middle", middleIdx, "midval", middleVal);
        if (middleVal === val) {
            return middleIdx
        }
        // TARGET = 6
        // BAD FOR expect(findRotatedIndex([6, 7, 8, 9], [1, 2, 3, 4], 3)).toBe(6)
        // 2nd pass - [1,2,3,4]

        // TARGET = 8
        // 1st pass: [6,7,8,9], [1,2,3,4] with middleVal = 9, Index of 3, length is 7
        // 2nd pass: [6,7], [8,9] w/ middleValue = 7, index of 1, length is 4
        if (middleVal > arr[middleIdx + 1] && middleVal > val && arr[middleIdx - 1] >= val &&
            arr[rightIdx] <= val) {
            // console.log("starting point! decrease right index", middleIdx - 1);
            // leftIdx = middleIdx + 1
            rightIdx = middleIdx - 1;
        } else if (middleVal > arr[middleIdx + 1] && middleVal < val) {
            // console.log("starting point! increase left index", middleIdx + 1);
            // rightIdx = middleIdx - 1;
            leftIdx = middleIdx + 1
            // REMOVE THESE NEXT TWO IF NEEDED
        } else if (middleVal > arr[middleIdx + 1] && middleVal > val) {
            // console.log("starting point! UP LEFT index", middleIdx + 1);
            // rightIdx = middleIdx - 1;
            leftIdx = middleIdx + 1
        } else if (middleVal > arr[middleIdx + 1] && middleVal < val) {
            // console.log("starting point! DOWN RIGHT index", middleIdx - 1);
            rightIdx = middleIdx - 1;
            // leftIdx = middleIdx + 1
        } else if (middleVal < val) {
            leftIdx = middleIdx + 1
        } else if (middleVal > val) {
            rightIdx = middleIdx - 1;
        } else {
            break
        }

    }
    return -1
}
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3));
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8));
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3));

module.exports = findRotatedIndex