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

function interruptPromise() {
  new Promise((resolve, reject) => {
    resolve(1);
    console.log("1");
  })
    .then((res) => {
      // return new Promise(() => {});
      return Promise.reject("reject");
      console.log("2");
    })
    .then((res) => {
      console.log("3");
    })
    .catch((error) => {
      console.log(error);
    });
}

function promiseChain() {
  new Promise((resolve, reject) => {
    console.log("外部promise");
    resolve();
  })
    .then(() => {
      console.log("外部第一个then");
      new Promise((resolve, reject) => {
        console.log("内部promise");
        resolve();
      })
        .then(() => {
          console.log("内部第一个then");
          return Promise.resolve();
        })
        .then(() => {
          console.log("内部第二个then");
        });
    })
    .then(() => {
      console.log("外部第二个then");
    })
    .then(() => {
      console.log("外部第三个then");
    })
    .then(() => {
      console.log("外部第四个then");
    });
}

promiseChain();
