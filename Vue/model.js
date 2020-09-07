function defineReactive(data, key, value) {
  //递归调用，监听所有属性
  observer(value);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) {
        // 判断订阅者是否是第一次调用 get，如果是第一次，将它添加到发布者数组里
        dep.addSub(Dep.target);
      }
      return value;
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal;
        dep.notify(); //通知订阅器
      }
    }
  });
}

function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

// 发布者类
function Dep() {
  // subs 数组存储订阅者
  this.subs = [];
}
Dep.prototype.addSub = function (sub) {
  // 添加订阅者
  console.log('添加 sub')
  this.subs.push(sub);
}
Dep.prototype.notify = function () {
  // 通知所有订阅者执行 update 方法
  console.log('属性变化通知 Watcher 执行更新视图函数');
  this.subs.forEach(sub => {
    sub.update();
  })
}
Dep.target = null;

// 订阅者类
function Watcher(vm, prop, callback) {
  this.vm = vm;
  this.prop = prop;
  this.callback = callback;
  // 在第一次获取 data 属性值时，将自己添加进该属性值订阅器
  this.value = this.get();
}
Watcher.prototype = {
  update: function () {
    const value = this.vm.$data[this.prop];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.callback.call(this.vm, value, oldVal);
    }
  },
  get: function () {
    Dep.target = this; // 储存订阅器
    const value = this.vm.$data[this.prop]; // 执行监听器里的get函数，把自己添加为订阅者
    Dep.target = null; // 释放自身
    return value;
  }
}

function Mvue(options, prop) {
	this.$options = options;
	this.$data = options.data;
	this.$prop = prop;
	this.$el = document.querySelector(options.el);
	this.init();
}
Mvue.prototype.init = function () {
    observer(this.$data);
    this.$el.textContent = this.$data[this.$prop];
    new Watcher(this, this.$prop, value => {
	    this.$el.textContent = value;
	});
}

var modeng = {
  age: 18,
}
observer(modeng);
modeng.age = 20;
