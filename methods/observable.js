const queuedObservers = new Set();

const observe = (fn) => queuedObservers.add(fn);
const observable = (obj) => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  console.log(result, 'res');
  queuedObservers.forEach((observer) => observer());
  return result;
}

const person = observable({
  name: '张三',
  age: 20,
  sex: 1,
});

function print() {
  console.log(`${person.name}, ${person.age}`);
}

function print2() {
  console.log(`${person.sex}`);
}

observe(print);
observe(print2);
person.name = '李四';

setTimeout(() => {
  person.name = '昭武';
}, 2000);

// 不够完善
