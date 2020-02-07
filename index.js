const NewCoronavirusReptilia = require('./lib');
const logger = require('./utils/Logger')();

// TODO 判断数据库连接是否正常
const startTime = new Date();
// 病毒爬虫任务
function newCoronavirusJob() {
  NewCoronavirusReptilia.saveNewCoronavirusDate().then(() => {
    logger.debug(`数据获取完成,消耗时间为${new Date() - startTime}ms`);
  }).catch((err) => {
    logger.error('newCoronavirusJob', err);
  });
}
newCoronavirusJob();
// 启动定时任务
// setInterval(newCoronavirusJob, Number.parseInt(time) * 60 * 1000);
