function printDiamond(n) {
  var arr = []
  for(let i=1; i<=n; i++) {
    str = "";
    for(let j=0; j<n-i; j++) {
      str += " ";
    }
    str += "/";
    for(let j=0; j<2*(i-1); j++) {
      str += " ";
    }
    str += "\\";
    arr.push(str);
  }
  for(let i=1; i<=n; i++) {
    str = "";
    for(let j=0; j<i-1; j++) {
      str += " ";
    }
    str += "\\";
    for(let j=0; j<2*(n-i); j++) {
      str += " ";
    }
    str += "/";
    arr.push(str);
  }
  for(let i=0; i<2*n; i++) {
    console.log(arr[i]);
  }
}

printDiamond(5);