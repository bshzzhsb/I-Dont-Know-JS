function reverseStr(str) {
  return Array.from(str).reduce((reStr, c) => {
    return c + reStr;
  })
}

console.log(reverseStr("abcd"))