/**
 * 两束之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 */
var twoSum = function (nums, target) {
  let i = nums.length;
  while (i > 1) {
    let last = nums.pop();
    if (nums.indexOf(target - last) > -1) {
      return [nums.indexOf(target - last), nums.length];
    }
    i--;
  }
};

const nums = [2, 7, 11, 15],
  target = 13;
console.log(twoSum(nums, target), 'rrr');
