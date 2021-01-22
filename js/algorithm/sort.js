var quickSort = function (arr) {
  if (arr.length <= 1) {
    //如果数组长度小于等于1无需判断直接返回即可
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2); //取基准点
  var pivot = arr.splice(pivotIndex, 1)[0]; //取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数
  var left = []; //存放比基准点小的数组
  var right = []; //存放比基准点大的数组
  for (var i = 0; i < arr.length; i++) {
    //遍历数组，进行判断分配
    if (arr[i] < pivot) {
      left.push(arr[i]); //比基准点小的放在左边数组
    } else {
      right.push(arr[i]); //比基准点大的放在右边数组
    }
  }
  //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
  return quickSort(left).concat([pivot], quickSort(right));
};
// 快速排序while做法
var sortArray = function (nums) {
  quick(nums, 0, nums.length - 1);
  return nums;
};

function quick(list, left, right) {
  let index = 0;
  if (list.length > 1) {
    index = partition(list, left, right); // 帮助我们将子数组分离为较小值数组和较大值数组
    left < index - 1 && quick(list, left, index - 1);
    index < right && quick(list, index, right);
  }
}

function partition(list, left, right) {
  let mid = list[(right + left) >> 1];
  while (left <= right) {
    while (list[left] < mid) {
      left++;
    }
    while (list[right] > mid) {
      right--;
    }
    if (left <= right) {
      [list[left], list[right]] = [list[right], list[left]];
      left++;
      right--;
    }
  }
  return left;
}

// 归并排序
var sortArray2 = function (nums) {
  return splitList(nums);
};
// 拆分数组
function splitList(list) {
  let len = list.length;
  if (len === 1) return list;
  let mid = len >> 1;
  let left = list.slice(0, mid);
  let right = list.slice(mid);
  return mergeList(splitList(left), splitList(right));
}
// 合并, 排序数组
function mergeList(left, right) {
  let res = [];
  let il = 0,
    lenl = left.length;
  let ir = 0,
    lenr = right.length;
  while (il < lenl && ir < lenr) {
    if (left[il] < right[ir]) {
      res.push(left[il++]);
    } else {
      res.push(right[ir++]);
    }
  }
  while (il < lenl) {
    res.push(left[il++]);
  }
  while (ir < lenr) {
    res.push(right[ir++]);
  }
  return res;
}

// 冒泡排序
function sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        let tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
      }
    }
  }
  return arr;
}

// 插入排序
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

function insertSort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    current = arr[i];
    preIndex = i - 1;
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }

  return arr;
}

console.log(quickSort([3, 1, 2, 4, 0]));
console.log(sortArray([3, 1, 2, 4, 0]), 'quickSort2');
console.log(sortArray2([3, 1, 2, 4, 0]), 'quickSort2');
console.log(sort([3, 1, 2, 4, 0]));
console.log(insertSort([3, 1, 2, 4, 0]));

// 第K个最大值
let findKthLargest = function (nums, k) {
  return quickSelect(nums, nums.length - k);
};

let quickSelect = (arr, k) => {
  return quick2(arr, 0, arr.length - 1, k);
};

let quick2 = (arr, left, right, k) => {
  let index;
  if (left < right) {
    // 划分数组
    index = partition2(arr, left, right);
    // Top k
    if (k === index) {
      return arr[index];
    } else if (k < index) {
      // Top k 在左边
      return quick2(arr, left, index - 1, k);
    } else {
      // Top k 在右边
      return quick2(arr, index + 1, right, k);
    }
  }
  return arr[left];
};

let partition2 = (arr, left, right) => {
  // 取中间项为基准
  var datum = arr[Math.floor(Math.random() * (right - left + 1)) + left],
    i = left,
    j = right;
  // 开始调整
  while (i < j) {
    // 左指针右移
    while (arr[i] < datum) {
      i++;
    }

    // 右指针左移
    while (arr[j] > datum) {
      j--;
    }

    // 交换
    if (i < j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    // 当数组中存在重复数据时，即都为datum，但位置不同
    // 继续递增i，防止死循环
    if (arr[i] === arr[j] && i !== j) {
      i++;
    }
  }
  return i;
};

console.log(findKthLargest([3, 8, 2, 4, 0]), ' findKthLargest');
