a = 10;
function A(a) {
  A = function () {
    console.log(a);
    console.log(this.a);
  };
  console.log(a++);
}
A(1);
A(5);
