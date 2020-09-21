var i = 0;

function resolvePromise(promise2, x, resolve, reject) {
  console.log("promise2: "+promise2+" x: "+x);
  if(x === promise2) {
    return reject(new TypeError('检测到promise循环'))
  }

  if(x instanceof Promise) {
    console.log("xindex: "+x.index);
  }

  let called;

  if(x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if(typeof then === 'function') {
        console.log("function");
        then.call(x, y => {
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called) return;
          called = true;
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if(called) return;
      called = true;
      reject(e);
    }
  } else {
    console.log("resolve resolve");
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.status = "pending";
    this.value;
    this.error;
    this.index = i++;
    console.log("constructor: "+this.index+executor);
    this.resolveQueue = [];
    this.rejectQueue = [];

    let resolve = (res) => {
      if (this.status === "pending") {
        this.value = res;
        this.status = "resolved";
        this.resolveQueue.forEach((fn) => fn());
      }
    };

    let reject = (err) => {
      if (this.status === "pending") {
        this.error = err;
        this.status = "rejected";
        this.rejectQueue.forEach((fn) => fn());
      }
    };

    executor(resolve, reject);
  }

  then(onFullfilled, onRejected) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err;};

    let promise2;

    promise2 = new Promise((resolve, reject) => {
      if (this.status === "resolved") {
        console.log(1);
        setTimeout(() => {
          let x = onFullfilled(this.value);
          if(x instanceof Promise) console.log("x then: "+x.index);
          console.log("resolve: "+this.index+" "+promise2);
          resolvePromise(promise2, x, resolve, reject);
        }, 0)
      }
      if (this.status === "rejected") {
        setTimeout(() => {
          let x = onRejected(this.error);
          console.log("rejected: "+this.index+" "+promise2);
          resolvePromise(promise2, x, resolve, reject);
        }, 0)
      }
      if (this.status === "pending") {
        this.resolveQueue.push(() => {
          setTimeout(() => {
            let x = onFullfilled(this.value);
            console.log("push resolve: "+this.index+" "+promise2);
            resolvePromise(promise2, x, resolve, reject);
          }, 0)
        });
        this.rejectQueue.push(() => {
          setTimeout(() => {
            let x = onRejected(this.error);
            console.log("push rejected: "+this.index+" "+promise2);
            resolvePromise(promise2, x, resolve, reject);
          }, 0)
        });
      }
    });

    console.log(promise2.status);

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

const promise = new Promise((resolve, reject) => {
  resolve();
}).then(
  (res) => {
    console.log("go in first then");
    return new Promise((resolve, reject) => {
      resolve('hello world')
      console.log("promise");
    })
  }).then(
    (res) => {
      console.log(this);
      console.log("go in second then", res);
    }
  )

Promise.resolve = function(val) {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

Promise.reject = function(val) {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}

Promise.all = function(promises) {
  let num = 0
  let result = []
  return new Promise((reslove, reject) => {
    promises.forEach(promise => {
      promise.then(val => {
          if(num >= promises.length){
              reslove(result)
          }else{
              result.push(val)
              num++
          }
      },function(e){
          reject(e)
      })
    })
  })
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for(let i=0; i<promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  })
}
// console.log(promise);
