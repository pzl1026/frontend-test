/**
 * map的方法实现
 * @param {*} fn
 * @param {*} context
 */
Array.prototype.myMap = function (fn, context) {
  var arr = Array.prototype.slice.call(this);
  var newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(fn.call(context, arr[i], i, this));
  }
  return newArr;
};

/**
 * reduce实现方法
 * @param {*} fn
 * @param {*} context
 */
Array.prototype.myReduce = function (fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;
  res = initialValue ? initialValue : arr[0];
  startIndex = initialValue ? 0 : 1;
  for (let i = startIndex; i < arr.length; i++) {
    res = fn.call(null, res, arr[i], i, this);
  }
  return res;
};

/**
 * call实现方式
 * @param {*} context
 * @param  {...any} args
 */
Function.prototype.myCall = function (context = window, ...args) {
  let func = this;
  let fn = Symbol('fn');
  context[fn] = func;

  let res = context[fn](...args);

  delete context[fn];

  return res;
};

/**
 * apply实现方式, 与call不同的是arg少了三个点
 * @param {*} context
 * @param  {...any} args
 */
Function.prototype.myApply = function (context = window, args) {
  let func = this;
  let fn = Symbol('fn');
  context[fn] = func;

  let res = context[fn](...args);

  delete context[fn];

  return res;
};

/**
 * call优化方法，将该方法可重新命名，挂在到content上
 * @param {*} context
 * @param  {...any} args
 */
Function.prototype.myCall2 = function (context = window, callName, ...args) {
  let func = this;
  let fn = callName || Symbol['fn'];
  context[fn] = func;

  let res = context[fn](...args);

  return res;
};

/**
 * create
 * @param {*} proto
 */
Object.prototype.myCreate = function (proto) {
  function F() {}
  F.prototype = proto;
  F.prototype.constructor = F;

  return new F();
};

/**
 * bind
 * @param {*} context
 * @param  {...any} args
 */
Function.prototype.myBind = function (context, ...args) {
  let self = this;
  let fBound = function () {
    return self.apply(
      this instanceof fBound ? this : context || window,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  console.log(this, 'proro');
  fBound.prototype = Object.create(this);
  return fBound;
};

/**
 * new方法
 * @param {*} fn
 * @param  {...any} args
 */
function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, args);
  return typeof res == 'object' ? res : instance;
}

/**
 * instanceof
 * @param {*} left
 * @param {*} right
 */
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proro == null) return false;
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

module.exports = {
  myNew,
  myInstanceof,
};
