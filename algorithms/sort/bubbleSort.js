const comparator = (a, b) => a - b;

function bubbleSort(array, cmp) {
  cmp = cmp || comparator;
  var temp;
  for(var i=0; i<array.length; i++) {
    var swapCount = 0;
    for(var j=0; j<array.length-1-i; j++) {
      if(cmp(array[j], array[j+1]) > 0) {
        temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
        swapCount++;
      }
    }
    if(swapCount === 0) {
      break;
    }
  }
  return array;
}

module.export = bubbleSort;

var arr = [12,213,1,23123,213,23,123,3,12,41412,5435,433];
console.log(bubbleSort(arr));