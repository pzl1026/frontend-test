//promise.js
class Promise2 {
  //传一个异步函数进来
  constructor(excutorCallBack) {
    this.status = 'pending';
    this.value = undefined;
    this.fulfillAry = [];
    this.rejectedAry = [];
    //=>执行Excutor
    let resolveFn = (result) => {
      if (this.status !== 'pending') return;
      let timer = setTimeout(() => {
        this.status = 'fulfilled';
        this.value = result;
        this.fulfillAry.forEach((item) => item(this.value));
      }, 0);
    };
    let rejectFn = (reason) => {
      if (this.status !== 'pending') return;
      let timer = setTimeout(() => {
        this.status = 'rejected';
        this.value = reason;
        this.rejectedAry.forEach((item) => item(this.value));
      });
    };
    try {
      //执行这个异步函数
      excutorCallBack(resolveFn, rejectFn);
    } catch (err) {
      //=>有异常信息按照rejected状态处理
      rejectFn(err);
    }
  }
  //then传进两个函数
  then(fulfilledCallBack, rejectedCallBack) {
    //保证两者为函数
    typeof fulfilledCallBack !== 'function'
      ? (fulfilledCallBack = (result) => result)
      : null;
    typeof rejectedCallBack !== 'function'
      ? (rejectedCallBack = (reason) => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;
    //返回新的Promise对象，后面称它为“新Promise”
    return new Promise((resolve, reject) => {
      //注意这个this指向目前的Promise对象，而不是新的Promise
      //再强调一遍,很重要：
      //目前的Promise(不是这里return的新Promise)的resolve和reject函数其实一个作为微任务
      //因此他们不是立即执行，而是等then调用完成后执行
      this.fulfillAry.push(() => {
        try {
          //把then里面的方法拿过来执行
          //执行的目的已经达到
          let x = fulfilledCallBack(this.value);
          //下面执行之后的下一步，也就是记录执行的状态，决定新Promise如何表现
          //如果返回值x是一个Promise对象，就执行then操作
          //如果不是Promise,直接调用新Promise的resolve函数,
          //新Promise的fulfilAry现在为空,在新Promise的then操作后.新Promise的resolve执行
          console.log(x instanceof Promise, 'x instanceof Promise ');
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });
      console.log(this.fulfillAry, 'this.fulfillAry');
      //以下同理
      this.rejectedAry.push(() => {
        try {
          let x = rejectedCallBack(this.value);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  catch(rejectedCallBack) {
    return this.then(null, rejectedCallBack);
  }

  //为类的静态方法，而不是在原型上
  static all(promiseAry = []) {
    let index = 0,
      result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promiseAry.length; i++) {
        promiseAry[i].then((val) => {
          index++;
          result[i] = val;
          if (index === promiseAry.length) {
            resolve(result);
          }
        }, reject);
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        return;
      } else {
        for (let i = 0; i < promises.length; i++) {
          promises[i].then((val) => {
            resolve(val);
          }, reject);
        }
      }
    });
  }

  static resolve(value) {
    if (value instanceof Promise) return value;
    return new Promise((resolve) => resolve(value));
  }

  static reject(value) {
    return new Promise((resolve, reject) => reject(value));
  }
}

// let p1 = new Promise2((resolve, reject) => {
//   setTimeout(() => {
//     Math.random() < 0.5 ? resolve(100) : reject(-100);
//   }, 1000);
// });

// let p2 = p1.then(
//   (result) => {
//     //执行then返回的是一个新的Promise
//     // return result + 100;
//     return new Promise((resolve, reject) => {
//       resolve(result + 100);
//     });
//   },
//   (err) => {
//     return err - 50;
//   }
// );
// let p3 = p2.then(
//   (result) => {
//     console.log(result, 's88');
//   },
//   (reason) => {
//     console.log(reason, '99');
//   }
// );

// let p4 = new Promise2((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1000);
//   }, 500);
// });

// Promise2.race([p1, p4]).then((res) => {
//   console.log(res, 'race');
// });

// Promise2.resolve(400).then((res) => {
//   console.log(res);
// });

// const p = Promise.reject('出错了').then(
//   (res) => {},
//   (err) => {
//     console.log(err);
//   }
// );

// 以下为自己编写
class Promise {
  constructor(excutorCallBack) {
    this.value = undefined;
    this.status = 'pending';
    this.fulfillAry = [];
    this.rejectedAry = [];

    let resolveFn = (val) => {
      if (this.status != 'pending') return;
      let timer = setTimeout(() => {
        this.status = 'fulfilled';
        this.value = val;
        this.fulfillAry.forEach((item) => {
          item(this.value);
        });
      });
    };

    let rejectFn = (reason) => {
      if (this.status != 'pending') return;
      let timer = setTimeout(() => {
        this.status = 'rejected';
        this.value = reason;
        this.fulfillAry.forEach((item) => {
          item(this.value);
        });
      });
    };

    try {
      excutorCallBack(resolveFn, rejectFn);
    } catch (err) {
      rejectFn(err);
    }
  }

  then(fulfillCallback, rejectedCallBack) {
    if (typeof fulfillCallback !== 'function') {
      fulfillCallback = (res) => res;
    }

    if (typeof rejectedCallBack !== 'function') {
      rejectedCallBack = (reason) => {
        throw new Error(reason instanceof Error ? reason.message : reason);
      };
    }

    return new Promise((resolve, reject) => {
      this.fulfillAry.push(() => {
        try {
          let x = fulfillCallback(this.value);
          console.log(this.value, 2222);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });
      this.rejectedAry.push(() => {
        try {
          let x = rejectCallback(this.value);
          x instanceof Promise ? x.then(resolve, reject) : reject(x);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}

let p11 = new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() < 0.5 ? resolve(100) : reject(-100);
  }, 1000);
});

let p22 = p11.then(
  (result) => {
    //执行then返回的是一个新的Promise
    // return result + 100;
    return new Promise((resolve, reject) => {
      resolve(result + 100);
    });
  },
  (err) => {
    return err - 50;
  }
);
let p33 = p22.then(
  (result) => {
    console.log(result, 's88');
  },
  (reason) => {
    console.log(reason, '99');
  }
);
