const NewCoronavirusReptilia = require('./lib');
const logger = require('./utils/Logger')();

// TODO 判断数据库连接是否正常
// let count = 1;

// 病毒爬虫任务
NewCoronavirusReptilia.saveNewCoronavirusDate().then(() => {
  logger.debug('数据获取完成');
});

// 启动定时任务
// setInterval(newCoronavirusJob, 30 * 60 * 1000);
