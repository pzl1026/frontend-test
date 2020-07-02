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
console.log(add(1)(2, 3, 4)());

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
