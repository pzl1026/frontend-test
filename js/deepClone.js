const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};

const getRegExp = (re) => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};

/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const clone = (parent) => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = (parent) => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      //   if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      //   proto = Object.getPrototypeOf(parent);
      proto = parent.__proto__;
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);
    console.log(index, parent);
    if (index != -1) {
      console.log(parent, 'parent');
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    console.log(child, 'child');
    parents.push(parent);
    children.push(child);
    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};

function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

function say() {
  console.log('hi');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'i'),
  d: Messi,
  e: {
    f: 'g',
  },
  g: [1, 2, 3],
  h: this.e,
};

oldObj.b = oldObj;

const newObj = clone(oldObj);
newObj.g.push(4);
// console.log(newObj.a, oldObj.a); // [Function: say] [Function: say]
// console.log(newObj.b, oldObj.b); // { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] } { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] }
// console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
// console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person] [Function: person]
console.log(oldObj, newObj, 'newobj22');

var son = { name: 'x' },
  father = { name: 'y' };
father.son = son;
son.father = father;

console.log(clone(father), 'father');

function deepClone2(obj) {
  let parents = [];
  let children = [];

  let clone = function (parent) {
    let child;
    if (isType(parent, 'Array')) {
      child = [];
    } else if (isType(parent, 'RegExp')) {
      child = new RegExp(parent.source, getRegExp(parent));
    } else if (isType(parent, 'Date')) {
      child = new Date(parent.getTime());
    } else {
      let proto = parent.__proto__;
      child = Object.create(proto);
    }
    let index = parents.indexOf(parent);
    if (index > -1) {
      return children[index];
    }

    parents.push(parent);
    children.push(child);
    for (let i in parent) {
      child[i] = clone(parent[i]);
    }
    return child;
  };
  return clone(obj);
}

console.log(deepClone2(father), 'father2');
