var ajax = function (url, method, body, succseeFn, failFn) {
  let request = new XMLHttpRequest();
  //初始化请求
  request.open(method, url);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        succseeFn.call(undefined, request.responseText);
      } else if (request.status >= 400) {
        failFn.call(undefined, request);
      }
    }
  };
  request.send(body);
};

ajax(
  '/ada',
  'post',
  'a=1&b=2',
  (responseText) => {
    console.log('s');
  },
  (request) => {
    console.log('f');
  }
);
