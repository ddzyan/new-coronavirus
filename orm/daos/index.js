const fs = require('fs');
// TODO 需要增加sql日志输出
const db = {};
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'AbstractDao.js'))
  .forEach((file) => {
    const fileName = file.substring(0, file.indexOf('.'));
    const ClassFile = require(`./${file}`);
    db[fileName] = new ClassFile();
  });

module.exports = db;
