const NewCoronavirusReptilia = require('./lib');


// TODO 判断数据库连接是否正常

// 启动病毒爬虫任务
NewCoronavirusReptilia.saveNewCoronavirusDate().then(() => {
  console.log('完成');
}).catch((err) => {
  console.error(err);
}).finally(() => {
  process.exit(1);
});
