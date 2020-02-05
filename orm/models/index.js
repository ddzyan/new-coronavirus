

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { msyqlConfig } = require('../../config');

const db = {};

// 初始化连接
const sequelize = new Sequelize(
  msyqlConfig.database, // 数据库名称
  msyqlConfig.username, // 用户名
  msyqlConfig.password, // 用户密码
  {
    dialect: msyqlConfig.dialect, // 数据库使用mysql
    host: msyqlConfig.host, // 数据库IP地址
    port: msyqlConfig.port, // 数据库服务器使用端口
    timezone: '+08:00',
    logging: false,
    pool: {
      max: 10,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: false,
      freezeTableName: true,
      charset: 'utf8mb4', // 字符集
      dialectOptions: {
        collate: 'utf8mb4_general_ci', // 排序规则 ci 不区分大小写,cs则为局别大小写
      },
      timestamps: true,
    },
    // operatorsAliases: false,
  },
);

// 读取表模型，实例化并且导入
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});
Object.assign(db, { sequelize, Sequelize });
module.exports = db;
