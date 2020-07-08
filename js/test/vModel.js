function mvvm2(opt) {
  this.$data = opt.data;
  Observer(this.$data, this);
  var dom = nodeToFragment(document.getElementById(opt.el), this);
  document.getElementById(opt.el).appendChild(dom);
}

function nodeToFragment(node, vm) {
  let flag = document.createDocumentFragment(node);
  let child;
  while ((child = node.firstChild)) {
    compiler(child, vm);
    flag.appendChild(child);
  }
  return flag;
}

function compiler(node, vm) {
  var reg = /\{\{(.*)\}\}/;

  if (node.nodeName == 'INPUT') {
    let attr = Array.from(node.attributes).find((m) => m.nodeName == 'v-model');
    let name = attr.nodeValue;
    node.value = vm.$data[name];
    node.addEventListener('input', function (e) {
      vm.$data[name] = e.target.value;
    });
    new Watcher(vm, node, name, 'input');
  }
  if (node.nodeName == '#text' && reg.test(node.nodeValue)) {
    let name = RegExp.$1;
    name = name.trim();
    new Watcher(vm, node, name, 'text');
  }
}

function Observer(data, vm) {
  Object.keys(data).forEach((item, k) => {
    defineReactive(data[item], item, vm);
  });
}

function defineReactive(obj, key, vm) {
  let dep = new Dep();
  Object.defineProperty(vm.$data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Dep.target) dep.addSub(Dep.target);
      return obj;
    },
    set: function (newVal) {
      if (newVal == obj) return;
      obj = newVal;
      dep.notify();
    },
  });
}

function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function (watcher) {
    this.subs.push(watcher);
  },
  notify: function () {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  },
};

// watcher初始化，主要对node进行初始化
function Watcher(vm, node, name, nodeType) {
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.nodeType = nodeType;
  this.beforeValue = '';
  this.update();
  Dep.target = null;
}

Watcher.prototype = {
  update: function () {
    this.get();
    if (this.nodeType == 'text') {
      this.node.nodeValue = this.value;
    } else if (this.nodeType == 'input') {
      this.node.value = this.value;
    }
  },
  get: function () {
    this.value = this.vm.$data[this.name];
  },
};

export default mvvm2;
