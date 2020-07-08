// 动态规划

/**
 * 返回最长回文字符串
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let n = s.length;
  let res = '';
  let dp = Array.from(new Array(n), () => new Array(n).fill(0));
  console.log(dp);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.substring(i, j + 1);
      }
    }
  }
  return res;
};
console.log(longestPalindrome('babad'));

/**
 * 最大子序和
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let ans = nums[0];
  let sum = 0;
  for (const num of nums) {
    if (sum > 0) {
      sum += num;
      //   console.log(num, sum, '11');
    } else {
      //   console.log(num, '22');
      sum = num;
    }
    ans = Math.max(ans, sum);
  }
  return ans;
};
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

/**
 * 最小路径和
 * 将左跟右数字累计相加得到当前的数字，当前数字取最小值
 */
function minPathSum(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i == 0 && j == 0) continue;
      else if (i == 0) {
        grid[i][j] = grid[i][j - 1] + grid[i][j];
      } else if (j == 0) {
        grid[i][j] = grid[i - 1][j] + grid[i][j];
      } else {
        grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
      }
    }
  }
  console.log(grid);
  return grid[grid.length - 1][grid[0].length - 1];
}
console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
);
