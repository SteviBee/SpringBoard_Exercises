# Part 1 - Simplify the following big O expressions as much as possible:

1. O(n + 10) = 0(n)
2. O(100 * n) = 0(n)
3. O(25) = 0(1)
4. O(n^2 + n^3) = 0(n^3)
5. O(n + n + n + n) = 0(n)
6. O(1000 * log(n) + n) = 0(log(n))
7. O(1000 * n * log(n) + n) = 0(n log n) -> snake?
8. O(2^n + n^2) = 0(2^n) -> expondental 
9. O(5 + 3 + 1) = 0(1)
10. O(n + n^(1/2) + n^2 + n * log(n)^10) = 0(n^2)

# Part 2 -  Calculate Time Comlexity 

`function logUpTo(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}`
**Time Complexity:**  = 0(n)

function logAtLeast10(n) {
  for (let i = 1; i <= Math.max(n, 10); i++) {
    console.log(i);
  }
}
**Time Complexity:** = 0(n)

`function logAtMost10(n) {
  for (let i = 1; i <= Math.min(n, 10); i++) {
    console.log(i);
  }
}`
**Time Complexity:** = 0(1)

`function onlyElementsAtEvenIndex(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}`
**Time Complexity:** = 0(n) because as array gets bigger as does the number of operations needed to be performed

`function subtotals(array) {
  let subtotalArray = [];
  for (let i = 0; i < array.length; i++) {
    let subtotal = 0;
    for (let j = 0; j <= i; j++) {
      subtotal += array[j];
    }
    subtotalArray.push(subtotal);
  }
  return subtotalArray;
}`
**Time Complexity:** = 0(n^2) becausse as arr -> infinity it has to do more subtotal operations too... i think

`function vowelCount(str) {
  let vowelCount = {};
  const vowels = "aeiouAEIOU";

  for (let char of str) {
    if(vowels.includes(char)) {
      if(char in vowelCount) {
        vowelCount[char] += 1;
      } else {
        vowelCount[char] = 1;
      }
    }
  }

  return vowelCount;`

__Time Complexity__:  = 0(n) because as str goes to infinite the operations only grow with it

# Part 3 - short answer
Answer the following questions

- True or false: n^2 + n is O(n^2). True
- True or false: n^2 * n is O(n^3). True
- True or false: n^2 + n is O(n). False
- What’s the time complexity of the .indexOf array method? O(n) because worst case as the array length grows, and if the answer is at the end, then the operations will grow with the array
- What’s the time complexity of the .includes array method? O(n) same as above
- What’s the time complexity of the .forEach array method? Depends i think, because if the function is calling each element prior that could almost be factoral. If i had to guesss  O(n) because as the array length grows so does the number of times to call the function.
- **What’s the time complexity of the .sort array method? At least O(n^2) because you have to do arr[i] > arr[i-1] for all. I believe DEPENDS** TYPICALLY O(n log n)
- What’s the time complexity of the .unshift array method? O(n) as array length grows it needs to count more because it has to change the index of ALL elements in an array whereas push only 
- What’s the time complexity of the .push array method? **O(n)** Wrong, because as input grows the opeartions grow. You could have to add infinte size array to infinate. 
    - IT is O(1) because it just adds one to the end of the array. It dones't change index of anythign 
- What’s the time complexity of the .splice array method? O(n) as arr lengh or input grows so does operation
- What’s the time complexity of the .pop array method? **O(n) because worse case it searches to infinity** WRONG it is O(1) because it just removes the last one and doesn't need to change others
- What’s the time complexity of the Object.keys() function? O(n) 

## List of Arrays
- Methods:
    - Insert = O(1) or O(n)
    - Remove = O(1) or O(n)
    - search = O(n)
    - access = O(1)
- Method Type:
    - Push = O(1) = insert at end nbd
    - pop = O(1) = remove from end nbd
    - shift = O(n) = remove from START therefore has to change index of all other array elements so depends on array size, tough
    - unshift = O(n) = add from START therefore has to change index of all other array elements so depends on array size, tough
    - concat = O(n)
    - slice = O(n)
    - splice = O(n)
    - sort = O(n * log n) = because divide and conqur merge sort (non-nums) or quicksort (nums) (i think , log n) times array size (n)
    - map = O(n)

BONUS

- What’s the space complexity of the Object.keys() function? O(n) because reference types length grows with infinity 