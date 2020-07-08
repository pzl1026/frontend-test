/**
 * Created by EX-pengzhiliang001 on 2017-05-16.
 */
/**
 * Created by EX-pengzhiliang001 on 2017-05-15.
 */

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
  console.log(node.firstChild);
  var child;
  while ((child = node.firstChild)) {
    console.log(child, node.firstChild, 8888);
    compile(child, vm);
    flag.appendChild(child); // 将子节点劫持到文档片段中
  }
  return flag;
}

var reg = /\{\{(.*)\}\}/;
function compile(node, vm) {
  if (node.nodeType == 1) {
    var attr = node.attributes;
    for (var i = 0; i < attr.length; i++) {
      console.log(attr[i].nodeName);
      if (attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue;
        node.addEventListener('input', function (e) {
          vm[name] = e.target.value;
        });
        node.value = vm[name];
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

function defineReactive(vm, key, obj) {
  var dep = new Dep();
  Object.defineProperty(vm, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log(Dep.target, 99);
      if (Dep.target) dep.addSub(Dep.target);
      return obj;
    },
    set: function (newVal) {
      console.log(newVal);
      if (newVal == obj) return;
      obj = newVal;
      dep.notify();
    },
  });
  console.log(dep, 'dep');
}

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
    this.value = this.vm[this.name];
  },
};
