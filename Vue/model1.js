const Observer = function (data) {
  console.log(1); //开始4 new Vue的时候就会执行
  // 循环修改为每个属性添加get set
  for (let key in data) {
    defineReactive(data, key);
  }
};

const defineReactive = function (obj, key) {
  console.log(2); //开始5 new Vue的时候就会执行
  // 局部变量dep，用于get set内部调用
  const dep = new Dep();
  // 获取当前值
  let val = obj[key];
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log(3); //开始10  开始19
      console.log("in get");
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend();
      return val;
    },
    set(newVal) {
      console.log(4); //开始15
      if (newVal === val) {
        return;
      }
      val = newVal;
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify();
    },
  });
};

const observe = function (data) {
  console.log(5); //开始3 new Vue的时候就会执行
  return new Observer(data);
};

const Vue = function (options) {
  console.log(6); //开始1 new Vue的时候就会执行
  const self = this;
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === "function") {
    console.log(7); //开始2   new Vue的时候就会执行
    this._data = options.data.apply(this);
  }
  // 挂载函数
  this.mount = function () {
    console.log(8); //开始7  new Vue以后，执行vue.mount()
    new Watcher(self, self.render);
  };
  // 渲染函数
  this.render = function () {
    console.log(9); //开始9 开始18  render函数执行后走到这里
    with (self) {
      _data.text; //这里取data值的时候，就会走get方法
    }
  };
  // 监听this._data
  observe(this._data); //new Vue的时候就会执行,这里执行完，就表示new Vue的过程执行完了
};

const Watcher = function (vm, fn) {
  console.log(10); //开始8  执行vue.mount()以后会走到这里
  const self = this;
  this.vm = vm;
  // 将当前Dep.target指向自己
  Dep.target = this;
  // 向Dep方法添加当前Wathcer
  this.addDep = function (dep) {
    console.log(11); //开始13
    dep.addSub(self);
  };
  // 更新方法，用于触发vm._render
  this.update = function () {
    console.log(12); //开始17
    console.log("in watcher update");
    fn();
  };
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn(); //开始9  fn是render函数，这里fn()就会赋值的时候执行
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null;
};

const Dep = function () {
  console.log(13); //开始6  new Vue的时候就会执行到new Dep，然后执行到这里
  const self = this;
  // 收集目标
  this.target = null;
  // 存储收集器中需要通知的Watcher
  this.subs = [];
  // 当有目标时，绑定Dep与Wathcer的关系

  this.depend = function () {
    console.log(14); //开始11   开始20 走了get获取属性后，就要进行依赖收集
    if (Dep.target) {
      console.log(15); //开始12
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self);
    }
  };
  // 为当前收集器添加Watcher
  this.addSub = function (watcher) {
    console.log(16); //开始14
    self.subs.push(watcher);
  };
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function () {
    console.log(17); //开始16
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  };
};

const vue = new Vue({
  data() {
    return {
      text: {
        child: "hello world",
      },
    };
  },
});

vue.mount(); // in get
vue._data.text.child = "123"; // in watcher update /n in get
