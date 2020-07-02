/**
 * 发布订阅模式实现eventBus
 */
class EmiterEvent {
  constructor() {
    this._event = {};
  }

  _isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]'
      ? fn
      : () => {};
  }

  addlisternerEvent(type, fn) {
    let callback = this._isFunction(fn);
    if (!this._event[type]) {
      this._event[type] = [callback];
    } else {
      this._event[type].push(callback);
    }
  }

  emit(type, ...args) {
    if (!this._event[type]) {
      throw Error(`${type} event not found`);
      return;
    }

    for (let i = 0; i < this._event[type].length; i++) {
      let fn = this._event[type][i];
      fn.call(this, ...args);
    }
  }

  removelistenerEvent(type, fn) {
    let callback = this._isFunction(fn);
    delete this._event[type];
    callback();
  }
}

const ee = new EmiterEvent();
ee.addlisternerEvent('change', function (...args) {
  console.log(args, 'change1');
});
ee.addlisternerEvent('change', function (...args) {
  console.log(args, 'change2');
});
ee.emit('change', 'str');
ee.removelistenerEvent('change', function (...args) {
  console.log(`change已删除`);
});
ee.emit('change', 'str');
