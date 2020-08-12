let arr = [[1,1,2],[1,2],[3,3,4]];
for(let i of arr[0]) {
  for(let j of arr[1]) {
    for(let k of arr[2]) {
      console.log(i*100 + j*10 + k);
    }
  }
}