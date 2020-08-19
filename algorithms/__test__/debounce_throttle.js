function debounce(cb) {
  var tim = null;
  return function() {
    clearTimeout(tim);
    tim = setTimeout(() => {
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