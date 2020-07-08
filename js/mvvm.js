/**
 * Created by EX-pengzhiliang001 on 2017-05-16.
 */
/**
 * Created by EX-pengzhiliang001 on 2017-05-15.
 */

// 初始化，做两件事情，对data进行劫持，对dom进行compiler
function Mvvm(options) {
  this.data = options.data;
  Observe(this.data, this);
  var id = options.el;
  var dom = nodeToFragment(document.getElementById(id), this);
  document.getElementById(id).appendChild(dom);
}

function Observe(obj, vm) {
  Object.keys(obj).forEach(function (v, k) {
    defineReactive(vm, v, obj[v]);
  });
}

function nodeToFragment(node, vm) {
  var flag = document.createDocumentFragment(node);
  var child;
  console.dir(node, flag, 'flass');
  while ((child = node.firstChild)) {
    console.log(child, node.firstChild, 999);
    compile(child, vm);
    flag.appendChild(child); // 将子节点劫持到文档片段中
  }
  return flag;
}
// 对dom进行watcher
var reg = /\{\{(.*)\}\}/;
function compile(node, vm) {
  if (node.nodeType == 1) {
    var attr = node.attributes;
    for (var i = 0; i < attr.length; i++) {
      console.log(attr[i].nodeName);
      if (attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue;
        node.addEventListener('input', function (e) {
          vm.data[name] = e.target.value;
          console.log(vm.data, name, '  vm.data');
        });
        node.value = vm.data[name];

        node.removeAttribute('v-model');
      }
    }
    new Watcher(vm, node, name, 'input');
  }
  if (node.nodeType == 3) {
    if (reg.test(node.nodeValue)) {
      var name = RegExp.$1;
      name = name.trim();
      new Watcher(vm, node, name, 'text');
    }
  }
}

// 对数据进行劫持监听
function defineReactive(vm, key, obj) {
  var dep = new Dep();
  console.log(vm.data, key, 'vm,ke');
  Object.defineProperty(vm.data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log(Dep.target, 99);
      if (Dep.target) dep.addSub(Dep.target);
      return obj;
    },
    set: function (newVal) {
      console.log(newVal, ' newVal');
      if (newVal == obj) return;
      obj = newVal;
      dep.notify();
    },
  });
  console.log(dep, 'dep');
}

// 对数据进行依赖监听
function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (v, k) {
      v.update();
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
    this.value = this.vm.data[this.name];
    console.log(this.vm, this.value, 'getgetet');
  },
};

export default Mvvm;
