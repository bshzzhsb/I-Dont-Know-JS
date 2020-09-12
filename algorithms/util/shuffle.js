function shuffle(arr) {
  let len = arr.length;
  for(let i = 0; i < len; i++) {
    let random = Math.floor(Math.random() * (len-i));
    [arr[len-1-i], arr[random]] = [arr[random], arr[len-1-i]];
  }
  return arr;
}

let arr = new Array(100).fill(1).map((_, index) => index + 1);
console.log(shuffle(arr));