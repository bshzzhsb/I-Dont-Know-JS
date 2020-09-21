Promise.all = function (promises) {
  const res = new Array(promises.length);
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises; i++) {
      promises[i].then((result) => {
        res[i] = result;
        count++;
        if (count === promises.length) {
          resolve(res);
        }
      }).catch((err) => {
        reject(err);
      })
    }
  });
};
