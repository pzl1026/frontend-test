const { myNew } = require('./api.js');

describe('myMap test', function () {
  it('should myMap', function () {
    let arr1 = [1, 2];
    expect(arr1.myMap((n) => n * 2)).toEqual([2, 4]);
  });
});

describe('myReduce test', function () {
  it('should myReduce', function () {
    let arr1 = [1, 2];
    expect(arr1.myReduce((res, o) => res + o)).toEqual(3);
    expect(arr1.myReduce((res, o) => res + o, 8)).toEqual(11);
  });
});

describe('myCall test', function () {
  it('should myCall', function () {
    function a(n) {
      return (n || this.n) + 2;
    }
    let o1 = {
      n: 1,
    };
    expect(a.myCall(o1)).toEqual(3);
    expect(a.myCall(this, 4)).toEqual(6);
    expect(a.myApply(this, [4])).toEqual(6);
  });
});

describe('myCall2 test', function () {
  it('should myCall2', function () {
    function a() {
      return this.n + 2;
    }
    let o1 = {
      n: 1,
    };
    console.log(a.myCall2(o1, 'a1'));
    console.log(o1, 'o1添加了一个a1的方法');
    expect(a.myCall(o1, 'a1')).toEqual(3);
  });
});

describe('myObject test', function () {
  it('should myObject', function () {
    let o1 = Object.myCreate({ a: 1 });
    expect(o1.a).toEqual(1);
  });
});

describe('myBind test', function () {
  it('should myBind', function () {
    let o = {
      x: 1,
      a() {
        return this.x;
      },
    };
    let a2 = o.a;
    expect(a2.myBind(o)()).toEqual(1);
  });
});

describe('myNew test', function () {
  it('should myNew', function () {
    function a(x, y) {
      return { x, y };
    }
    expect(myNew(a, 1, 2)).toEqual({ x: 1, y: 2 });
  });
});
