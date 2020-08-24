var strings = new Set();

var objs = [
  {
    f1: function () {
      let a = 2;
      return a;
    },
    f3: function () {
      let a = 3;
      return a;
    },
  },
  {
    f1: function () {
      let a = 2;
      return a;
    },
  },
  {
    f3: function () {
      let a = 3;
      return a;
    },
    f1: function () {
      let a = 2;
      return a;
    },
  },
];

function removeDuplicate(objs) {
  var uniques = [];
  for (var i = 0; i < objs.length; i++) {
    var keys = Object.keys(objs[i]);
    keys.sort();
    console.log(keys);
    var str = "";
    for (var j = 0; j < keys.length; j++) {
      str += keys[j].toString();
      str += objs[i][keys[j]].toString();
    }
    if (!strings.has(str)) {
      strings.add(str);
      uniques.push(objs[i]);
    }
  }
  console.log(uniques);
  return uniques;
}

// removeDuplicate(objs);

function templateString() {
  const tagFunc = (strs, name, gender) => {
    console.log(strs, name, gender);
    const [str1, str2, str3] = strs;
    const genderParsed = gender == "1" ? "男" : "女";
    // 可以在此做过滤，字符串处理，多语言等操作
    return str1 + name + str2 + str3 + genderParsed;
  };

  // 带标签的模板字符串,
  const person = {
    name: "xiaohui",
    gender: 1,
  };
  // 返回值为标签函数的返回值
  const result = tagFunc`my name is ${person.name}.gender is ${person.gender}`;
  console.log(result); //my name is xiaohui.gender is 男
}

Function.prototype.myBind = function(context, ...args) {
  const that = this;
  args = args ? args : [];
  function Fn() {}
  function newFn(...newFnArgs) {
      /*
       * 绑定 this 指向
       * 如果绑定的函数被 new 执行，当前函数的 this 就是当前的实例
       */
      return that.apply(this instanceof newFn ? this : context, [...args, ...newFnArgs]);
  }
  // new 出来的结果可以找到原有类的原型
  newFn.prototype = Object.create(this.prototype);
  // Fn.prototype = this.prototype;
  // newFn.prototype = new Fn();
  console.log(newFn.prototype.__proto__ === this.prototype)
  return newFn;
}

function fn1() {}
var obj = {}

var bid = fn1.myBind(obj)
var p = new bid();
console.log(p.__proto__.__proto__ === fn1.prototype)
