/**
 * @param {number[]} A
 * @return {number}
 */
var lenLongestFibSubseq = function (A) {
  let set = new Set(A);
  let count = 2;
  let max = 0;

  for (let firstIndex = 0; firstIndex < A.length - 2; firstIndex++) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < A.length - 1;
      secondIndex++
    ) {
      count = 2;
      let f1 = A[firstIndex];
      let f2 = A[secondIndex];
      let f3 = f1 + f2;
      while (set.has(f3)) {
        count++;
        if (count > max) max = count;
        f1 = f2;
        f2 = f3;
        f3 = f1 + f2;
      }
    }
  }
  return max;
};

/**
 * 求最长斐波那契序列
 * @param {number[]} A
 * @return {number}
 */
var lenLongestFibSubseq2 = function (A) {
  let map = new Map();
  for (let i = 0; i < A.length; i++) {
    map.set(A[i], i);
  }
  let max = 0;
  let dp = Array.from({ length: A.length }, () => new Array(A.length).fill(2));
  for (let secondIndex = 0; secondIndex < A.length - 1; secondIndex++) {
    for (
      let thirdIndex = secondIndex + 1;
      thirdIndex < A.length;
      thirdIndex++
    ) {
      let f2 = A[secondIndex];
      let f3 = A[thirdIndex];
      let f1 = f3 - f2;
      if (f1 < f2 && map.has(f1)) {
        dp[secondIndex][thirdIndex] = Math.max(
          dp[map.get(f1)][secondIndex] + 1,
          dp[secondIndex][thirdIndex]
        );
        max = Math.max(max, dp[secondIndex][thirdIndex]);
      }
    }
  }
  return max;
};

console.log(lenLongestFibSubseq([1, 2, 3, 4, 5, 6, 7, 8]));

function fib(n) {
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    sum = (a + b) % 1000000007;
    a = b;
    b = sum;
  }
  return a;
}

console.log(fib(3));
