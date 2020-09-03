// 笛卡尔
function cartesion([...arys]) {
  if (arys.length == 0) return [];

  // if (arys.length == 1) {
  //   let newArr = [];

  //   arys[0].forEach((item) => {
  //     newArr.push([item]);
  //   });
  //   return newArr;
  // }

  return arys.reduce((prev, item) => {
    let temp = [];

    for (let i = 0; i < prev.length; i++) {
      for (let j = 0; j < item.length; j++) {
        temp.push(
          Array.isArray(prev[i]) ? [...prev[i], item[j]] : [prev[i], item[j]]
        );
      }
    }
    return temp;
  });
}

console.log(cartesion([[1], [2, 3]]));
console.log(cartesion([[2, 3]]));
