const NewCoronavirusReptilia = require('./lib');
const logger = require('./utils/Logger')();

/*
* TODO
* 1.使用crontab 定时任务
* 2.采用logger将控制台信息输出带本地日志文件中
*/

const time = process.argv[2] || 30;
console.log(`设定任务间隔时间为${time}分钟`);
// TODO 判断数据库连接是否正常
let count = 1;
const startTime = new Date();
// 病毒爬虫任务
function newCoronavirusJob() {
  NewCoronavirusReptilia.saveNewCoronavirusDate().then(() => {
    logger.debug(`第${count}次数据获取完成,消耗时间为${new Date() - startTime}ms`);
  }).catch((err) => {
    console.error('newCoronavirusJob', err);
  }).finally(() => {
    count++;
  });
}
// 启动时，马上获取一次
newCoronavirusJob();
// 启动定时任务
setInterval(newCoronavirusJob, Number.parseInt(time) * 60 * 1000);
