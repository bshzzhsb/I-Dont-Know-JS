function takeLongTime(n) {
  return new Promise(resolve => {
      setTimeout(() => resolve(n + 200), n);
  });
}

function step1(n) {
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}

function step2(m, n) {
  console.log(`step2 with ${m} and ${n}`);
  return takeLongTime(m + n);
}

function step3(k, m, n) {
  console.log(`step3 with ${k}, ${m} and ${n}`);
  return takeLongTime(k + m + n);
}

// async function doIt() {
//   console.time("doIt");
//   const time1 = 300;
//   const time2 = await step1(time1);
//   const time3 = await step2(time1, time2);
//   const result = await step3(time1, time2, time3);
//   console.log(`result is ${result}`);
//   console.timeEnd("doIt");
// }
function doIt() {
  console.time("doIt");
  const time1 = 300;
  step1(time1)
    .then(time2 => {
      return step2(time1, time2).then(time3 => [time1, time2, time3]);
    })
    .then(times => {
      const [time1, time2, time3] = times;
      return step3(time1, time2, time3)
    })
    .then(result => {
      console.log(`result is ${result}`);
      console.timeEnd("doIt")
    })
}

// doIt();

const setDelay = (millisecond) => {
  return new Promise((resolve, reject)=>{
      if (typeof millisecond != 'number') reject(new Error('参数必须是number类型'));
      setTimeout(()=> {
        resolve(`我延迟了${millisecond}毫秒后输出的`)
      }, millisecond)
  })
}

function timeout(millisecond) {
  return ()=> {
    return setDelay(millisecond);
  }
}

var arr = [timeout(2000), timeout(1000), timeout(1000)]

const p = arr.reduce((total, current) => {
  return total.then((result) => {
      console.log(result);
      console.log(total);
      return current()
  })
}, Promise.resolve('程序开始'))

p.then((result) => {
  console.log('finish', result);
})