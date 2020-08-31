function kmp(str) {
  let next = [-1];
  let i = 0, j = -1;
  while(i < str.length) {
    if(j == -1 || str[i] === str[j]) {
      i++;
      j++;
      next.push(j);
    } else {
      j = next[j];
    }
  }
  return next;
}

console.log(kmp("ababaabab"));