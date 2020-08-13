let arr = [[1,1,2],[1,2],[3,3,4]];

function concat(num, i) {
  if(i == arr.length) {
    console.log(num);
    return;
  }
  for(let k of arr[i]) {
    concat(num * 10 + k, i+1);
  }
}

concat(0, 0);
