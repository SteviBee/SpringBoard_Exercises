/** product: calculate the product of an array of numbers. */
// NOTES - the recusive call is like a placeholder (after the return)
function product(nums) {

  if (nums[0] === undefined) return 1

  return nums.pop() * product(nums);

  // MY WRONG THOUGHT PATTERN - LEAVING IN TO KNOW WHAT NOT TO DO
  // for (let i = 0; i < nums.length; i++) {
  //     console.log("le=n", nums.length);
  //     if (nums.length === 0 ) {
  //       return 1
  //     } else {
  //       let val = nums.pop()
  //       console.log("val", val);
  //       return val * product()
  //     }
  //   }
}



// console.log("KLDJFLKDSJ", product([1,2,3,4]) );

//  KEEPPING TRACK OF INDEX IS HARD: LEARN THIS METHOD
function sum(nums, i = 0) {
  if (i === nums.length) return 0;

  return nums[i] + sum(nums, i + 1);
}

// // ANSWWER KEY - good reference for index 
// function product(nums, idx = 0) {
//   if (idx === nums.length) return 1;
//   console.log("idx", idx, "nums", nums);
//   return nums[idx] * product(nums, idx + 1);
// }

/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, out = []) {

  if (i === words.length) {
    return out[0].length;
  } else if (out[0] === undefined) {
    out.push(words[i])
  }  else if (words[i].length > out[0].length) {
    out.pop()
    out.push(words[i])
  }

  return longest(words, i +1, out)
  // for (const i of words) {
  //   if (words[i].length ) {

  //   } longest(i)
  // }
}

// 5
// console.log("logn", longest(["hello", "hi", "hola"]))
//word[0] 
// 5 ["hi", "hola"]
// 2 ["hola"]
// 4 [] (undefinded)

/** everyOther: return a string with every other letter. */

function everyOther(str, idx = 0, newstr="") {
  if (str.length === idx) {
    return newstr
  }
  if (idx % 2 === 0 ) {
    newstr += str[idx]
  } 
  return everyOther(str, idx + 1, newstr)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx = 0, pali = "") {
  if (str === pali) {
    return true
  }
  // console.log("the FAIL state", str.length === idx, str.length, idx);
  // console.log(str.length, idx, pali)
  if (str.length === idx) {
    return false
  } 
  pali = str[idx] + pali

  return isPalindrome(str, idx + 1, pali)
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */
// findIndex(animals, "cat");  // 1
function findIndex(arr, val, idx = 0) {
  if (arr[idx] === val) {
    return idx
  } else if (arr.length === idx){
    return -1
  }
  return findIndex(arr, val, idx + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx = 0, revStr = "") {
  if (str.length === idx) {
    return revStr
  }
  revStr = str[idx] + revStr
  return revString(str, idx + 1, revStr)
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strArray = []
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      strArray.push(...gatherStrings(obj[i]))
    } else {
      if (typeof obj[i] === "string") {
        strArray.push(obj[i])
      }
    }
  }
  return strArray

}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

 function binarySearch(arr, val, left = 0, right = arr.length) {
  if (left > right) {
    return -1;
  }
  let middle = Math.floor((right + left) / 2);
  if (arr[middle] === val) {
    return middle;
  }
  if (arr[middle] > val) {
    return binarySearch(arr, val, left, middle - 1);
  }
  return binarySearch(arr, val, middle + 1, right);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
