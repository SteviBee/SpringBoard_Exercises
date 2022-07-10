/**
Merging Arrays Pseudocode
Create empty out array
Start pointers at beginnings of arrays a and b
If a value <= b value, push a value to out & increase a pointer
Else, push b value to out & increase b pointer
Once we exhaust one array, push all remaining values from other array
mergeSort Pseudocode

Recursively:
Split array into halves until you have arrays that have length of 0 or 1
Merge split arrays and return the merged & sorted array
 */

// Accepts two sorted arrays and returns one sorted array
function merge(sortedArr1, sortedArr2) { 
    const ans = [];
    let a = 0;
    let b = 0;

    while (a < sortedArr1.length && b < sortedArr2.length) {
        if (sortedArr1[a] <= sortedArr2[b]) {
            console.log("PUSHING from A", sortedArr1[a]);
            ans.push(sortedArr1[a])
            a++
        } else {
            console.log("PUSHING from b", sortedArr2[b]);
            ans.push(sortedArr2[b])
            b++
        }
    }
    // only run once one is done:
    // Works because the a & b are scoped outside of these while loops so they all 
    // depend on the same / start where the first while loop left off 
    while (a < sortedArr1.length) {
        ans.push(sortedArr1[a])
        a++
    }
    while (b < sortedArr2.length) {
        ans.push(sortedArr2[b])
        b++
    }
    return ans

}

function mergeSort(array) { 
    // base case: (return array when it is sorted aka 0,1 in length)
    if (array.length <= 1) {
        return array
    }

    // Find mid
    let mid = array.length/2
    // Recusrive call to keep defining L & R as recursive functions until their length is short and sorted
    let left = mergeSort(array.slice(0,mid))
    let right = mergeSort(array.slice(mid, array.length))

    // return them sorted together from merge
    return merge(left, right)
}

module.exports = { merge, mergeSort };