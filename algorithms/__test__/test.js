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

// concat(0, 0);

function partition(arr, left, right) {
  let point = arr[right-1]
  let minEnd = left;
  let maxEnd;
  for(maxEnd=left; maxEnd < right-1; maxEnd++) {
    if(arr[maxEnd] - point < 0) {
      let temp = arr[minEnd];
      arr[minEnd] = arr[maxEnd];
      arr[maxEnd] = temp;
      minEnd++;
    }
  }
  arr[right-1] = arr[minEnd];
  arr[minEnd] = point;
  return minEnd;
}

function quickSort(arr, left, right) {
  if(left < right) {
    let p = partition(arr, left, right);
    quickSort(arr, left, p);
    quickSort(arr, p+1, right);
  }
  return arr;
}

console.log(quickSort([56,312,123,59,30,50,78], 0, 7));
