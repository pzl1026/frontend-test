Array.prototype.myMap = function (fn, context) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    let item = this[i];
    newArr.push(fn.call(context, item, i, this));
  }
  return newArr;
};

console.log([1, 2].myMap((item) => item * 2));

Array.prototype.myReduce = function (fn, initialValue, context) {
  let startIndex = initialValue ? 0 : 1;
  let res = initialValue || this[0];
  for (let i = startIndex; i < this.length; i++) {
    let item = this[i];
    res = fn.call(context, res, item, i, this);
  }
  return res;
};

console.log([1, 2].myReduce((res, item) => item + res));

Function.prototype.myCall = function (context = global, ...args) {
  let func = this;
  let key = Symbol();
  context[key] = func;

  let res = context[key](...args);
  delete context[key];
  return res;
};

function mc(aa) {
  console.log(aa, 'mc');
}

mc.myCall(undefined, 99);

Function.prototype.myBind = function (context = global, ...args) {
  let func = this;
  let F = function () {
    return func.apply(context, args);
  };
  F.prototype = Object.create(this.prototype);
  return F;
};

var B1 = {
  name: 'b1',
  say: function (age) {
    console.log(this.name, age, 'name');
  },
};

function say2() {
  console.log(this.name, 'say2');
}

let b1 = say2.myBind(B1, 18);
console.log(b1, B1, 'b1');
b1();

function create(proto) {
  function F() {}
  F.prototype = proto;
  F.prototype.construcor = F;
  return new F();
}

let person = {
  name: 'pzl',
};
let p = create(person);
console.log(p.name, 'iii');

function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, args);
  return typeof res == 'object' ? res : instance;
}

function newTest(name) {
  this.name = name;
}

function newTest2(name) {
  return {
    name,
  };
}

function newTest3(name) {
  let n = name;
}

console.log(myNew(newTest, 'bll'), 'myNew');
console.log(myNew(newTest2, 'pzl'), 'myNew');
console.log(myNew(newTest3, 'pjb'), 'myNew');

function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (1) {
    if (proto == null) return false;
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function Ins2() {
  this.a = 1;
}

function Ins() {
  this.a = 1;
}
let ins = new Ins();
console.log(myInstanceof(ins, Ins2), 'ins');
console.log(myInstanceof(ins, Ins), 'ins');

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
      flag = false;
      fn.apply(this, args);
    }, delay);
  };
}

class Promise2 {
  constructor(callbackfn) {
    this.value = '';
    this.status = 'pending';
    this.fullfiledArgs = [];
    this.rejectedArgs = [];

    let resolveFn = (value) => {
      if (this.status == 'pending') {
        setTimeout(() => {
          this.status = 'fullfiled';
          this.value = value;
          this.fullfiledArgs.forEach((item) => item(this.value));
        });
      }
    };

    let rejectFn = (value) => {
      if (this.status == 'pending') {
        setTimeout(() => {
          this.status = 'rejected';
          this.value = value;
          this.rejectedArgs.forEach((item) => item(this.value));
        });
      }
    };

    try {
      callbackfn(resolveFn, rejectFn);
    } catch (err) {
      rejectFn(err);
    }
  }

  then(resolveCb, rejectCb) {
    if (typeof resolveCb != 'function') {
      resolveCb = (res) => res;
    }
    if (typeof rejectCb != 'function') {
      rejectCb = (res) => res;
    }
    return new Promise2((resolve, reject) => {
      this.fullfiledArgs.push(() => {
        try {
          let val = resolveCb(this.value);
          return val instanceof Promise2
            ? val.then(resolve, reject)
            : resolve(val);
        } catch (err) {
          reject(err);
        }
      });

      this.rejectedArgs.push(() => {
        try {
          let val = rejectCb(this.value);
          return val instanceof Promise2
            ? val.then(resolve, reject)
            : resolve(val);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  catch(callback) {
    return this.then(null, callback);
  }
}

let p1 = new Promise2((resolve, reject) => {
  setTimeout(() => {
    Math.random() < 0.5 ? resolve(100) : reject(-100);
  }, 1000);
});

let p2 = p1.then(
  (result) => {
    console.log(result + 100);
  },
  (err) => {
    console.log(err - 50);
  }
);

function flat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

console.log(flat([1, [2], [[3, 4]]]));

// 演对角线输出
function jiaoPrint(arr) {
  let cols = arr[0].length;
  let rows = arr.length;
  let nums = [];
  //层级
  for (let l = 0; l < cols + rows - 1; l++) {
    let sum = l;
    for (let i = 0; i < rows; i++) {
      let j = sum - i;
      if (i >= 0 && i < rows && j >= 0 && j < cols) {
        nums.push(arr[i][j]);
      }
    }
  }

  return nums;
}

console.log(
  jiaoPrint([
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
  ])
);

// 前序便利
function inorderTraversal3(root) {
  let ret = [];
  let stack = [root];
  while (stack.length) {
    root = stack.pop();
    ret.push(root.val);
    root.right && stack.push(root.right);
    root.left && stack.push(root.left);
  }

  return ret;
}

// 中序遍历
function inorderTraversal2(root) {
  let ret = [];
  let stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    ret.push(root.val);
    root.right && (root = root.right);
  }

  return ret;
}

// 层序便利
function levelOrder(root) {
  let ret = [];
  let stack = [root];
  while (stack.length !== 0) {
    ret.push([]);
    for (let i = 1; i <= stack.length; ++i) {
      let node = stack.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }
  return ret;
}

// 层序遍历
// var levelOrder = function (root) {
//   const ret = [];
//   if (!root) return ret;

//   const q = [];
//   q.push(root);
//   while (q.length !== 0) {
//     const currentLevelSize = q.length;
//     ret.push([]);
//     for (let i = 1; i <= currentLevelSize; ++i) {
//       const node = q.shift();
//       ret[ret.length - 1].push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     console.log(q, ret, 'ret');
//     console.log('//');
//   }

//   return ret;
// };
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

function cloneDeep(obj) {
  let parents = [];
  let children = [];

  function _clone(parent) {
    if (parent === null) return null;
    if (typeof parent != 'object') return parent;
    let child, proto;

    if (Array.isArray(parent)) {
      child = [];
    } else {
      proto = parent.__proto__;
      child = Object.create(proto);
      console.log(proto);
    }

    let index = parents.indexOf(parent);
    console.log(index, 'index');
    if (index != -1) {
      return children[index];
    }

    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      child[i] = _clone(parent[i]);
    }

    return child;
  }

  return _clone(obj);
}

var son = { name: 'x' },
  father = { name: 'y' };
father.son = son;
son.father = father;

var newSon = cloneDeep(son);

console.log(newSon, 'ddd');
