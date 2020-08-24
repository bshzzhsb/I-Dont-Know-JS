function debounce(cb) {
  var timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, arguments);
    }, 500)
  }
}

function throttle(cb) {
  var flag = true;
  return function() {
    if(!flag) return;
    flag = false;
    setTimeout(() => {
      cb.apply(this, arguments);
      flag = true;
    })
  }
}