//二分法

// 查找数组中元素之和为target的index
function getIndex(arr, target) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let right = binarySearch(arr, i, len - 1, target - arr[i]);
    if (right != -1) {
      return [i, right];
    }
  }
  throw new Error('没有找到该元素');
}

function binarySearch(arr, left, right, target) {
  while (left < right) {
    let mid = (left + right) / 2;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  if (arr[left] == target) {
    return left;
  }
  return -1;
}
console.log(getIndex([2, 7, 8, 10], 18));

// 得到旋转数组最小的元素
function getMinNumber(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let mid = parseInt((left + right) / 2);
    if (arr[mid] > arr[right]) {
      left += 1;
    } else if (arr[mid] < arr[right]) {
      right = mid;
    } else {
      right--;
    }
  }

  return arr[left];
}

console.log(getMinNumber([3, 4, 5, 1, 2]));
console.log(getMinNumber([2, 2, 2, 0, 1]));

// 查找重复数
// [1,3,4,2,2]
var findDuplicate = function (nums) {
  const n = nums.length;
  let l = 1,
    r = n - 1,
    ans = -1;
  while (l <= r) {
    let mid = (l + r) >> 1;
    let cnt = 0;
    for (let i = 0; i < n; ++i) {
      cnt += nums[i] <= mid;
    }
    console.log(cnt, 'cnt');
    if (cnt <= mid) {
      l = mid + 1;
      console.log(l, 'lll');
    } else {
      r = mid - 1;
      ans = mid;
      console.log(ans, 'ans');
    }
  }
  return ans;
};

console.log(findDuplicate([1, 3, 4, 2, 2]));
