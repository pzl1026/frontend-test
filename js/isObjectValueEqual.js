function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    var propA = a[propName];
    var propB = b[propName];
    if (typeof propA === 'object') {
      if (isObjectValueEqual(propA, propB)) {
        // return true     这里不能return ,后面的对象还没判断
      } else {
        return false;
      }
    } else if (propA !== propB) {
      return false;
    } else {
    }
  }
  return true;
}

var a = {
  id: 1,
  name: 2,
  c: {
    age: 3,
  },
};
var b = {
  id: 1,
  name: 2,
  c: {
    age: 13,
  },
};
console.log(isObjectValueEqual(a, b)); //true
