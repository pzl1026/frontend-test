// 闭包执行结果

let x = 1;
function A(y) {
  let x = 2;
  function B(z) {
    console.log(x, y, z);
    console.log(x + y + z);
  }
  return B;
}
let C = A(2);
C(3);

var obj = {
  '2': 3,
  '3': 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push,
};
obj.push(1);
obj.push(2);
console.log(obj);

var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);
console.log(JSON.stringify(a), 'aaa');

// 执行顺序
// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2');
// }
// console.log('script start');
// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);
// async1();
// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
// }).then(function () {
//   console.log('promise2');
// });
// console.log('script end');

// // 下面的输出结果
// function Foo() {
//   Foo.a = function () {
//     console.log(1);
//   };
//   this.a = function () {
//     console.log(2);
//   };
// }
// Foo.prototype.a = function () {
//   console.log(3);
// };
// Foo.a = function () {
//   console.log(4);
// };
// Foo.a();
// let obj = new Foo();
// obj.a();
// Foo.a();
