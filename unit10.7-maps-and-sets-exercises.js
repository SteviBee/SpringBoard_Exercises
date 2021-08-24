// 1
// ANSWER - a set with - 1,2,3,4 values

// 2
// ANSWER - "ref" because it iterates throught "referee" but drops off the repeats "e,r" when going to a set and then puts in back on with join.

// 3
// ANSWER - a map with two array keys one true one false 

// 4 hasDuplicate
function hasDuplicate(array) {
    if (array.length === [...new Set(array)].length) {
        return true
    } 
    return false;
}

// Answer one line- const hasDuplicate = arr => new Set(arr).size !== arr.length
function isVowel(char){
    return "aeiou".includes(char);
  }
  
  function vowelCount(str){
    const vowelMap = new Map();
    for(let char of str){
      let lowerCaseChar = char.toLowerCase()
      if(isVowel(lowerCaseChar)){
        if(vowelMap.has(lowerCaseChar)){
          vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
        } else {
          vowelMap.set(lowerCaseChar, 1);
        }
      }
    }
    return vowelMap;
  }