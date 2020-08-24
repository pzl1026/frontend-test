// leetcode 209

// 双指针跟滑动需要left和right指针
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
 */
var minSubArrayLen = function (s, nums) {
  let left = 0;
  let sum = 0;
  let min = Infinity; //无穷大
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= s) {
      min = Math.min(min, right - left + 1);
      sum -= nums[left++];
    }
  }
  return min < Infinity ? min : 0;
};

let s = 4,
  nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(s, nums));
