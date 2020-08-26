function reverseString_ArrayReduce(str) {
  return Array.from(str).reduce((reStr, c) => {
    return c + reStr;
  })
}

function reverseString_ArrayReverse(str) {
  return Array.from(str).reverse().join("")
}

function reverseString_Shift(str) {
  let len = str.length;
  let res = [];
  for(let i=0; i<len; i++) {
    res.unshift(str.charAt(i));
  }
  return res.join("");
}

console.log(reverseString_Shift("abcd efghijklmn123456789"))