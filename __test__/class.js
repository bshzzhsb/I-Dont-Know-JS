// 定义父类
function Parent(value) {
  console.log(this);
  this.language = ['javascript', 'react', 'node.js'];
  this.value = value;
  console.log(this);
}

// 定义子类
function Children() {
  Parent.apply(this, arguments);
}

const test = new Children(666);

test.language // ['javascript', 'react', 'node.js']
test.value // 666