// 不需要知道函数参数个数，最后必须要（）执行
function currying(fn) {
  var allArgs = [];

  return function next() {
    var args = [].slice.call(arguments);

    if (args.length > 0) {
      allArgs = allArgs.concat(args);
      return next;
    } else {
      return fn.apply(null, allArgs);
    }
  };
}
var add = currying(function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

// const add = (...args) => args.reduce((a, b) => a + b);
console.log(add(1)(2, 3, 4)());

// 此柯里化函数必须知道函数参数个数，不需要最后的（）执行
const curry2 = (fn) => {
  const len = fn.length;
  const judge = (...args1) => {
    return args1.length >= len
      ? fn(...args1)
      : (...args2) => judge(...[...args1, ...args2]);
  };

  return judge;
};

const plus = curry2((a, b, c, d, e) => a + b + c + d + e);
console.log(plus(1)(2, 3)(4)(5));

// 正则
function currying2(fn) {
  let exp;
  return function next(...args) {
    if (!exp || Object.prototype.toString.call(args[0]) == '[object RegExp]') {
      exp = args[0];
      if (args.length > 1) {
        return fn.apply(null, args);
      }
      return next;
    } else {
      return fn.apply(null, [exp, ...args]);
    }
  };
}

var exec = currying2(function (exp, str) {
  console.log(exp, str, 'esss');
  return exp.test(str);
});

let a = exec(/\w+/);
console.log(a('ss'), 'kk');

let b = exec(/\d+/);
console.log(a('77'), 'kk2');
console.log(a('uu'), 'kk3');

let c = exec(/\d{1,2}/, 'uuuuuyy');
console.log(c, 'kk4');

function currying3(fn, length) {
  length = length || fn.length; // 注释 1
  console.log(length, 'lengt');
  return function (...args) {
    console.log(args, args.length >= length, 'args.length >= length');
    // 注释 2
    return args.length >= length // 注释 3
      ? fn.apply(this, args) // 注释 4
      : currying(fn.bind(this, ...args), length - args.length); // 注释 5
  };
}

// 参考自 segmentfault 的@大笑平
const currying4 = (fn) =>
  (judge = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg));

// Test
// const fn = currying4(function (a, b, c) {
//   console.log([a, b, c]);
// });

var add2 = currying4(function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

function add2(a) {
  return function (b) {
    return a + b;
  };
}

// fn('a', 'b', 'c'); // ["a", "b", "c"]
// fn('a', 'b')('c'); // ["a", "b", "c"]
// fn('a')('b')('c'); // ["a", "b", "c"]
// fn('a')('b', 'c'); // ["a", "b", "c"]

// console.log(add2(1)(2, 3, 4));
