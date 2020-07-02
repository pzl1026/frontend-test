/**
 * 前段路由的实现
 */

export default class Routers {
  constructor() {
    this._router = {};
    this._bindPopState();
  }

  init(path) {
    history.replaceState({ path }, null, path);
    this._router[path] && this._router[path]();
  }

  router(path, fn) {
    this._router[path] = fn || function () {};
  }

  go(path) {
    history.pushState({ path }, null, path);
    if (this._router[path]) {
      this._router[path]();
    } else {
      throw Error('该路由还未注册');
    }
  }

  _bindPopState() {
    window.addEventListener('popstate', (e) => {
      let path = e.state && e.state.path;
      this._router[path] && this._router[path]();
    });
  }
}
