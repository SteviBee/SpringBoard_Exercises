

function sortedFrequency(sortedArr, target) {
    let firstIndex = findFirst(sortedArr, target)
    let lastIndex = findLast(sortedArr, target)
    // console.log("main fn", firstIndex, lastIndex);
    // Fail fast up top (no target in arr), then if not return differnce of first and last target index
    // Which are the total occcurances 
    if (firstIndex === -1) {
        return -1
    } else {
        return lastIndex - firstIndex + 1
    }
}

const findFirst = (arr, target) => {
    let upper = arr.length - 1;
    let lower = 0
    let mid;

    // While the upper index is still greater than the lower do stuff
    while (upper >= lower) {
        // Find pivot point / middle index and value
        mid = Math.floor((upper + lower) / 2)

        if (
            // If you are at the start of the array OR the start of the target num, 
            // THEN return middle index to be used by main fn
            (arr[mid] === target && mid === 0) ||  
            (arr[mid] === target && arr[mid - 1] !== target)
            ) {
            return mid;
            // else if target is still less than mid value all the side above mid is not needed
            // SO bring the upper index closer
        } else if ( target <= arr[mid]) {
            upper = mid - 1
            // else if target great than arr[mid] then move lower up
        } else {
            lower = mid + 1 
        }
    }
    return -1
}

// Same as above except success condition for arr[mid+1] meaning the end of the target numbers
// AND moving upper / lower the same but towards tgt being greater
function findLast(arr, target) {
    let upper = arr.length - 1;
    let lower = 0;
    let mid;
    while (upper >= lower) {
      mid = Math.floor((upper + lower) / 2);
      if (
        (arr[mid] === target && mid === arr.length - 1) ||
        (arr[mid] === target && arr[mid + 1] !== target)
      ) {
        return mid;
      } else if (target >= arr[mid]) {
        lower = mid + 1;
      } else {
        upper = mid - 1;
      }
    }
  }

    // ********************* my code below ********** above I was looking at Springboard github
    // let leftIdx = 0;
    // let rightIdx = sortedArr.length - 1;
    // let ans = 0;
    // // let placeHolder;

    // while (leftIdx <= rightIdx) {
    //     console.log("leftI", leftIdx, "rightI", rightIdx);
    //     // find the middle value
    //     let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    //     // mv = 2
    //     let middleVal = sortedArr[middleIdx];
    //     console.log("midInx", middleIdx, "midvalue", middleVal)

    //     if (middleVal < target) {
    //         // middleVal is too small, look at the right side
    //         leftIdx = middleIdx + 1;
    //     } else if (middleVal > target) {
    //         // middleVal is too large, look at the left half
    //         rightIdx = middleIdx - 1;
    //     } else if (middleVal === target) {

    //         ans++
    //         sortedArr.slice(middleIdx,middleIdx+1)
    //         // if (sortedArr[leftIdx] === target) {
    //         //     leftIdx = middleIdx + 1
    //         // } else if (sortedArr[rightIdx] === target) {
    //         //     rightIdx = middleIdx - 1
    //         // }
            
    //     } else {
    //         break
    //     }
    // }

    // // left and right pointers crossed, val isn't in arr
    // return ans;




module.exports = sortedFrequency