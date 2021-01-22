// 最长升序子序列
// f(i)=max{f(i), f(j) + 1}
function lengthOfLIS(nums) {
  let len = nums.length;
  if (len < 2) {
    return len;
  }

  let dp = new Array(len).fill(1);
  console.log(dp);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  let res = 0;
  for (let i = 0; i < len; i++) {
    res = Math.max(res, dp[i]);
  }
  return res;
}
let nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums));

// 字符串排序(非dp)
var strSort = (nums) => {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let count = 0;
      while (nums[i].length > count && nums[j].length > count) {
        let n1 = nums[i].charCodeAt(count);
        let n2 = nums[j].charCodeAt(count);
        if (n1 > n2) {
          let temp = nums[j];
          nums[j] = nums[i];
          nums[i] = temp;
          break;
        }
        count++;
      }
    }
  }

  return nums;
};

// console.log(moveZeroes([3, 0, 12, 0, 0, 1]));
console.log(strSort(['ba', 'abc', 'bd', 'ac']));
//'bd', 'ac' , 'abc', 'ba'

// 最长公共子序列 （模糊查询）
var longestCommonSubsequence = function (text1, text2) {
  let n = text1.length;
  let m = text2.length;
  let dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (text1[i - 1] == text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  return dp[n][m];
};
console.log(longestCommonSubsequence('abcde', 'ace'));

// 最长的斐波那契子序列的长度
var lenLongestFibSubseq = function (A) {
  let map = new Map();
  for (let i = 0; i < A.length; i++) {
    map.set(A[i], i);
  }
  let max = 0;
  let dp = Array.from(new Array(A.length + 1), () =>
    new Array(A.length).fill(2)
  );
  for (let i = 0; i < A.length - 1; i++) {
    for (let j = i + 1; j < A.length; j++) {
      let f2 = A[i];
      let f3 = A[j];
      let f1 = f3 - f2;
      if (f1 < f2 && map.has(f1)) {
        dp[i][j] = Math.max(dp[map.get(f1)][i] + 1, dp[i][j]);
        max = Math.max(max, dp[i][j]);
      }
    }
  }
  return max;
};
console.log(lenLongestFibSubseq([1, 2, 3, 4, 5, 6, 7, 8]));

// 最大子序和
// 动态方程
// f(i)=max{f(i−1)+ nums[i] , nums[i]}
var maxSubArray = function (nums) {
  let pre = 0,
    maxAns = nums[0];
  nums.forEach((x) => {
    pre = Math.max(pre + x, x);
    maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};
var maxSubArray2 = function (nums) {
  let maxAns = nums[0];
  for (let i = 1; i < nums.length; i++) {
    nums[i] += Math.max(nums[i - 1], 0);
    maxAns = Math.max(maxAns, nums[i]);
  }
  return maxAns;
};
console.log(maxSubArray2([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// 打家劫舍 （和最大子序和有点类似,都是求最大和，只不过不能连续）
// dp[n] = MAX( dp[n-1], dp[n-2] + nums[i] )
var rob = function (nums) {
  const len = nums.length;
  if (len == 0) return 0;
  const dp = new Array(len + 1);
  dp[0] = 0;
  dp[1] = nums[0];
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[len];
};
console.log(rob([1, 2, 8, 1]), 77);

// 最长回文字符串
// dp[i][j] = (s[i] == s[j]) and dp[i + 1][j - 1]
function longestPalindrome(s) {
  // 特判
  let len = s.length;
  if (len < 2) {
    return s;
  }

  let maxLen = 1;
  let begin = 0;

  // dp[i][j] 表示 s[i, j] 是否是回文串
  let dp = Array.from(new Array(len), () => new Array(len));
  let charArray = s.split('');

  for (let i = 0; i < len; i++) {
    dp[i][i] = true;
  }
  for (let j = 1; j < len; j++) {
    for (let i = 0; i < j; i++) {
      if (charArray[i] != charArray[j]) {
        dp[i][j] = false;
      } else {
        if (j - i < 3) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
      }

      // 只要 dp[i][j] == true 成立，就表示子串 s[i..j] 是回文，此时记录回文长度和起始位置
      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1;
        begin = i;
      }
    }
  }
  return s.substring(begin, begin + maxLen);
}
console.log(longestPalindrome('babad'));

// 边界条件
// 剪绳子
// 整数拆分
// 买卖股票的最佳时机
// 股票的最大利润
// 最小路径和
// 最长不含重复字符的子字符串
// 编辑距离
