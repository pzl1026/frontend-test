/**
 * @param triangle: a list of lists of integers
 * @return: An integer, minimum path sum
 * https://www.lintcode.com/problem/triangle/solution?_from=ladder&&fromId=161
 */
const minimumTotal = function (triangle) {
  if (triangle == null || triangle.length == 0) {
    return -1;
  }
  if (triangle[0] == null || triangle[0].length == 0) {
    return -1;
  }

  //state
  let n = triangle.length;
  let f = Array(n).fill(0);
  f = f.map((item) => Array(n).fill(0));

  // initialize
  for (let i = 0; i < n; i++) {
    f[n - 1][i] = triangle[n - 1][i];
  }

  // function
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      f[i][j] = Math.min(f[i + 1][j], f[i + 1][j + 1]) + triangle[i][j];
    }
  }

  return f[0][0];
};
console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
