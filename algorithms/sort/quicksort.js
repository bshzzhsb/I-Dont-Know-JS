function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function partition(array, left, right, compare) {
  var cmp = array[right-1];
  var minEnd = left;
  var maxEnd;
  for(maxEnd = left; maxEnd < right - 1; maxEnd++) {
    if(compare(array[maxEnd], cmp) < 0) {
      swap(array, maxEnd, minEnd);
      minEnd += 1;
    }
  }
  swap(array, minEnd, right-1);
  return minEnd;
}

function quickSort(array, left, right, cmp) {
  if(left < right) {
    var p = partition(array, left, right, cmp);
    quickSort(array, left, p, cmp);
    quickSort(array, p+1, right, cmp);
  }
  return array;
}

export default quickSort;

var arr = [3,4,123,654,12,312,67123,126541,31];
arr = quickSort(arr, 0, arr.length, (el1, el2) => el1 - el2);
console.log(arr);