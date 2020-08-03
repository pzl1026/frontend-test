function quickSort(arr) {
  if (arr.length < 1) {
    return arr;
  }

  let middle = Math.floor(arr.length / 2);
  let middleValue = arr.splice(middle, 1)[0];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middleValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(middleValue, quickSort(right));
}

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

function fib(n) {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    let sum = a + b;
    a = b;
    b = sum;
  }
  return a;
}

console.log(quickSort([3, 1, 2, 4, 0]));
console.log(sort([3, 1, 2, 4, 0]));
console.log(fib(5));

// 二分法查询最小数
function minNumber(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[right]) {
      left++;
    } else if (arr[mid] < arr[right]) {
      right = mid;
    } else {
      right--;
    }
  }
  return arr[left];
}
console.log(minNumber([3, 1, 2, 4, 9]));

function levelOrder(root) {
  let ret = [];
  if (!root) return ret;

  let q = [];
  q.push(root);
  while (q.length !== 0) {
    let currentLength = q.length;
    ret.push([]);
    for (let i = 0; i < currentLength; i++) {
      let node = q.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  return ret;
}

console.log(
  levelOrder({
    val: 3,
    left: {
      val: 9,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 21,
        },
      },
      right: {
        val: 7,
      },
    },
  })
);
let root = {
  val: 1,
  left: {
    val: 4,
  },
  right: {
    val: 2,
    right: {
      val: 3,
    },
  },
};
function inorderTraversal2(root) {
  let ret = [];
  let stack = [];
  while (root || stack.length > 0) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    ret.push(root.val);
    root = root.right;
  }
  return ret;
}
console.log(inorderTraversal2(root));

function inorderTraversal3() {
  let ret = [];
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    root = stack.pop();
    ret.push(root.val);
    root.right && stack.push(root.right);
    root.left && stack.push(root.left);
  }
  return ret;
}
console.log(inorderTraversal3(root));

function inorderTraversal4(root) {
  let ret = [];
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    root.right && stack.push(root.right);
    root.left && stack.push(root.left);
    root = stack.pop();
    ret.push(root.val);
  }
  return ret;
}

console.log(inorderTraversal4(root));

function create(proto) {
  function F() {}
  F.prototype = proto;
  F.prototype.constructor = F;
  return new F();
}

function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, args);
  return typeof res == 'object' ? res : instance;
}

Function.prototype.myApply = function (context, args) {
  let func = this;
  let fn = Symbol();
  context[fn] = func;

  let res = context[fn](args);
  delete context[fn];
  return res;
};

Function.prototype.myBind = function (context, args) {
  let func = this;
  function F() {
    return func.apply(context, args);
  }
  F.prototype = Object.create(this.prototype);
  return F;
};

function instanceOf(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto == null) return false;
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function debounce(fn, delay) {
  let t = null;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let flag = false;
  return function (...args) {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      fn.apply(this, args);
      flag = false;
    }, delay);
  };
}

class Promise {
  constructor(callbackfn) {
    this.value = undefined;
    this.status = 'pending';
    this.fullfillArgs = [];
    this.rejectArgs = [];

    let resolveFn = (res) => {
      if (this.status !== 'pending') return;
      this.status = 'fulfilled';
      this.value = res;
      this.fullfillArgs.forEach((item) => {
        item(this.value);
      });
    };

    let rejectFn = (res) => {
      if (this.status !== 'pending') return;
      this.status = 'rejected';
      this.value = res;
      this.rejectArgs.forEach((item) => {
        console.log(888);
        item(this.value);
      });
    };

    try {
      callbackfn(resolveFn, rejectFn);
    } catch (err) {
      rejectFn(err);
    }
  }

  then(fulfillCallback, rejectCallback) {
    if (typeof fulfillCallback !== 'function') {
      fulfillCallback = (res) => res;
    }

    if (typeof rejectCallback !== 'function') {
      rejectCallback = (res) => {
        throw new Error(res instanceof Error ? res.message : res);
      };
    }
    return new Promise((resolve, reject) => {
      this.fullfillArgs.push(() => {
        try {
          let x = fulfillCallback(this.value);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });

      this.rejectArgs.push(() => {
        try {
          let x = rejectCallback(this.value);
          x instanceof Promise ? x.then(resolve, reject) : reject(x);
        } catch (err) {
          reject(err);
        }
      });
      console.log(this.fullfillArgs, this.rejectArgs);
    });
  }
}

let p11 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(222);
    Math.random() < 0.5 ? resolve(100) : reject(-100);
  }, 1000);
});

p11.then(
  (result) => {
    //执行then返回的是一个新的Promise
    // return result + 100;
    console.log(result + 100);
    //   return new Promise((resolve, reject) => {
    //     resolve(result + 100);
    //   });
  },
  (err) => {
    console.log(err - 50);
    // return err - 50;
  }
);

// 插入排序
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

console.log(insertSort([3, 1, 2, 4, 0]), 'insertSort');
