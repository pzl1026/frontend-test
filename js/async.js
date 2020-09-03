//自动执行器，如果一个Generator函数没有执行完，则递归调用
function asyncFun(func) {
  var gen = func();

  function next(data) {
    var result = gen.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}

function getNum(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 1);
    }, 1000);
  });
}

var func = function* () {
  var f1 = yield getNum(1);
  var f2 = yield getNum(f1);
  console.log(f2);
};
asyncFun(func);
