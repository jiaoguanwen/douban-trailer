/**
 * 解释同步 异步过程
 */
const doSync = (str, time) =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log(str + "用了" + time + "毫秒");
      resolve();
    }, time);
  });
const doAsync = (str, time, cb) => {
  setTimeout(() => {
    console.log(str + "用了" + time + "毫秒");
    cb && cb();
  }, time);
};
const doElse = str => {
  console.log(str);
};
const Jerry = { doSync, doAsync };
const Lin = { doSync, doAsync, doElse };
(async () => {
  //同步
  console.log("cas1: 林志玲来到门口");
  await Jerry.doSync("jerry 刷牙", 2000);
  console.log("一直等待啥也没干");
  await Lin.doSync("林志玲洗澡了", 2000);
  Lin.doElse("林志玲洗完澡再去做别的事情了");
  console.log('====================================');
  console.log('====================================');
  //异步过程
  console.log("cas2: 林志玲来到门口按下了通知开关");
  await Jerry.doAsync("jerry 刷牙", 2000, () => {
    console.log("卫生间通知洗澡了");
    Lin.doSync("林志玲洗澡了", 2000);
  });
  Lin.doElse("林志玲异步去玩手机了");
})();
