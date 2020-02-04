const models = require('./models');

/*
* 进行身份验证
* 同步数据库表配置
*/
models.sequelize.authenticate().then(() => {
  models.sequelize.sync().then(() => {
    console.log('创建成功');
  }).catch((error) => {
    console.error('创建失败', error);
  }).finally(() => {
    process.exit();
  });
});
