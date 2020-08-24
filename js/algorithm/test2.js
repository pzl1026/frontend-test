function quickSort(arr) {
  if (arr.length == 0) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let midValue = arr.splice(mid, 1)[0];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(midValue, quickSort(right));
}

console.log(quickSort([3, 1, 2, 4, 0]));

function levelOrder(root) {
  if (!root) return;

  let ret = [];
  let stack = [root];
  while (stack.length != 0) {
    let currentSize = stack.length;
    ret.push([]);
    for (let i = 0; i < currentSize; i++) {
      let node = stack.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
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
console.log(inorderTraversal2(root));

function inorderTraversal3(root) {
  let ret = [];
  let stack = [root];
  while (stack.length > 0) {
    let root = stack.pop();
    ret.push(root.val);
    root.right && stack.push(root.right);
    root.left && stack.push(root.left);
  }
  return ret;
}

console.log(inorderTraversal3(root));

function fib(n) {
  let a = 0;
  let b = 1;
  let sum;
  for (let i = 0; i < n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return a;
}
console.log(fib(2));

var reg = /\{\{(.*)\}\}/;
var o = { a: 1 };

let res = '{{a}}'.replace(reg, function (a, b, c) {
  console.log(a, b, c, 'iii');
  return o[b];
});
console.log(res, '');
