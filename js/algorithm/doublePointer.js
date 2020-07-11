// 获取最长的无重复字符串
var lengthOfLongestSubstring = function (s) {
  // 哈希集合，记录每个字符是否出现过
  const occ = new Set();
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1,
    ans = 0;
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
    }
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1));
      ++rk;
    }
    console.log(rk, 'ek');
    // 第 i 到 rk 个字符是一个极长的无重复字符子串
    ans = Math.max(ans, rk - i + 1);
  }
  return ans;
};

console.log(lengthOfLongestSubstring('pwwkew'), 'kk');

// 盛最多水的容器
function maxArea(height) {
  let i = 0,
    j = height.length - 1,
    res = 0;
  while (i < j) {
    res =
      height[i] < height[j]
        ? Math.max(res, (j - i) * height[i++])
        : Math.max(res, (j - i) * height[j--]);
  }
  return res;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

/**
 * 删除排序数组中的重复项
 */
function removeDuplicates(nums) {
  if (nums.length == 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] != nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}

console.log(
  removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]),
  'removeDuplicates'
);
/**
 * 卖股票的最佳时机
 */
function maxProfit(prices) {
  let minprice = prices[0];
  let maxprofit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minprice) minprice = prices[i];
    else if (prices[i] - minprice > maxprofit) maxprofit = prices[i] - minprice;
  }
  return maxprofit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]), 'maxProfit');

/**
 * 长度最小的子数组
 */

function minSubArrayLen(s, nums) {
  let n = nums.length;
  let ans = n;
  let start = 0,
    end = 0;
  let sum = 0;
  while (end < n) {
    sum += nums[end];
    while (sum >= s) {
      ans = Math.min(ans, end - start + 1);
      sum -= nums[start];
      start++;
    }
    end++;
  }
  return ans;
}
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]), 'minSubArrayLen');
