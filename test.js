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

removeDuplicate(objs);
