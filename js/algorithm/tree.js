//树

// 层序遍历
var levelOrder = function (root) {
  const ret = [];
  if (!root) return ret;

  const q = [];
  q.push(root);
  while (q.length !== 0) {
    const currentLevelSize = q.length;
    ret.push([]);
    for (let i = 1; i <= currentLevelSize; ++i) {
      const node = q.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    console.log(q, ret, 'ret');
    console.log('//');
  }

  return ret;
};

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

/**
 * 前序遍历:打印-左-右
中序遍历:左-打印-右
后序遍历:左-右-打印
 */
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
// 中序遍历(递归)
var inorderTraversal = function (root) {
  let nums = [];
  let fun = (root) => {
    //   以下执行顺序兑换就可以得到前序和后序遍历
    root.left && fun(root.left);
    nums.push(root.val);
    root.right && fun(root.right);
  };
  root && fun(root);
  return nums;
};

console.log(inorderTraversal(root));

// 中序遍历（zhai）
var inorderTraversal2 = function (root) {
  let nums = [];
  let stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    nums.push(root.val);
    root = root.right;
  }
  return nums;
};

console.log(inorderTraversal2(root));

// 前序便利
var inorderTraversal3 = function (root) {
  let nums = [];
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    root = stack.pop();
    nums.push(root.val);
    root.right && stack.push(root.right);
    root.left && stack.push(root.left);
  }
  return nums;
};
console.log(inorderTraversal3(root));

// 后序便利
var inorderTraversal4 = function (root) {
  let nums = [];
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    root.right && stack.push(root.right);
    root.left && stack.push(root.left);
    root = stack.pop();
    nums.push(root.val);
  }
  return nums;
};
console.log(inorderTraversal4(root));

// 验证是不是二叉搜索树
// 中序便利判断
var isValidBST = function (root) {
  let stack = [];
  let inorder = -Infinity;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    // 如果中序遍历得到的节点的值小于等于前一个 inorder，说明不是二叉搜索树
    if (root.val <= inorder) return false;
    inorder = root.val;
    root = root.right;
  }
  return true;
};
console.log();
