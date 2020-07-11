/**
 * map
 */
Array.prototype.myMap = function (fn, context) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    let item = this[i];
    newArr.push(fn.call(context, item, i, this));
  }
  return newArr;
};

console.log(
  [1, 2, 3].myMap((item) => {
    return item * 2;
  })
);

/**
 * reduce
 * @param {*} fn
 * @param {*} delay
 */
Array.prototype.myReduce = function (fn, initialValue, context) {
  let startIndex = initialValue ? 0 : 1;
  let res = initialValue || this[0];
  for (let i = startIndex; i < this.length; i++) {
    let item = this[i];
    res = fn.call(context, res, item, i, this);
  }
  return res;
};

console.log(
  [1, 2, 3].myReduce((res, a) => {
    return (res += a);
  }, 4)
);

/**
 * call
 * @param {*} fn
 * @param {*} delay
 */
Function.prototype.myCall = function (context = global, ...args) {
  let func = this;
  let fn = parseInt(Math.random() * 100);
  context[fn] = func;

  let res = context[fn](...args);
  delete context[fn];
  return res;
};

function mc(aa) {
  console.log(aa, 'mc');
}
mc.myCall(undefined, 99);

/**
 * bind
 */
Function.prototype.myBind = function (context, ...args) {
  let func = this;
  let F = function () {
    // return func.apply(
    //   this instanceof F ? this : context,
    //   args.concat([].slice.call(arguments))
    // );
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

/**
 * object.create
 * @param {*} fn
 * @param {*} delay
 */
function create(proto) {
  console.log(proto, 'pr');
  function F() {}
  F.prototype = proto;
  F.prototype.constructor = F;

  return new F();
}
let person = {
  name: 'pzl',
};
let p = create(person);
console.log(p.name, 'iii');

/**
 * new
 * @param {*} fn
 * @param {*} delay
 */

function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, args);
  console.log(typeof res == 'object', 'uuu');
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

/**
 * instanceof
 * @param {*} fn
 * @param {*} delay
 */
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (true) {
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
console.log(ins, 'sss');
console.log(myInstanceof(ins, Ins2), 'ins');

/**
 * 防抖
 */
const debounce = function (fn, delay) {
  let t = null;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

debounce(function (aa) {
  console.log(aa);
}, 2000)(9999);

/**
 * 节流
 */

const throttle = function (fn, delay) {
  let flag = false;
  return function (...args) {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      fn.apply(this, args);
      flag = false;
    }, delay);
  };
};

let th = throttle(function (aa) {
  console.log(aa);
}, 1000);
th(999);
th(888);
th(777);

/**
 * flatten
 */
const flatten = function (arr) {
  while (arr.some((item) => Array.isArray(item))) {
    console.log(...arr, 'arr');
    arr = [].concat(...arr);
  }
  return arr;
};
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];

console.log(flatten(arr));

// 可避免setInterval因执行时间导致的间隔执行时间不一致
setTimeout(function () {
  // do something
  setTimeout(arguments.callee, 500);
}, 500);

/**
 * 多维数组实现flat并且不重复排序
 */
function flatSortSet(arr) {
  return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {
    return a - b;
  });
}
var arrFlat = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
// console.log(flatSortSet(arrFlat), 'flatSortSet');
console.log(Array.from(arrFlat.flat(Infinity)), 'Infinity');
