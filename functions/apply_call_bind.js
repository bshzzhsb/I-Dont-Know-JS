Function.prototype.myBind = function (context, ...args) {
  const that = this;
  args = args ? args : [];
  function Fn() {}
  function newFn(...newFnArgs) {
    /*
     * 绑定 this 指向
     * 如果绑定的函数被 new 执行，当前函数的 this 就是当前的实例
     */
    return that.apply(this instanceof newFn ? this : context, [
      ...args,
      ...newFnArgs,
    ]);
  }
  // new 出来的结果可以找到原有类的原型
  newFn.prototype = Object.create(this.prototype);
  // Fn.prototype = this.prototype;
  // newFn.prototype = new Fn();
  console.log(newFn.prototype.__proto__ === this.prototype);
  return newFn;
};

function testBind() {
  function fn1() {}
  var obj = {};

  var bid = fn1.myBind(obj);
  var p = new bid();
  console.log(p.__proto__.__proto__ === fn1.prototype);
}

testBind()
