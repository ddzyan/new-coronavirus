const NewCoronavirusReptilia = require('./lib');


// TODO 判断数据库连接是否正常
let count = 1;

// 病毒爬虫任务
function newCoronavirusJob() {
  NewCoronavirusReptilia.saveNewCoronavirusDate().then(() => {
    console.log(`第${count}数据获取完成,时间${new Date()}`);
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    count++;
  });
}

// 启动定时任务
setInterval(newCoronavirusJob, 30 * 60 * 1000);

// 启动时，马上获取一次
newCoronavirusJob();
