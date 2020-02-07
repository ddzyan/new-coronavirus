const log4js = require('log4js');
const path = require('path');

log4js.configure({
  appenders: {
    newCoronavirus: { type: 'dateFile', filename: path.join(__dirname, '../logger.log'), daysToKeep: 10 }, // default option pattern: '.yyyy-MM-dd.log',
  },
  categories: { default: { appenders: ['newCoronavirus'], level: 'trace' } },
});

// 日志输出
class Logger {
  constructor(instance) {
    this.loggerInstance = instance || console;
  }

  error(name = '', err) {
    const date = new Date();
    let logText = `${date.toLocaleString()} `;
    if (err instanceof Error) {
      logText += `${name} name: ${err.name} msg:${err.message}\n`;
      logText += `stack :${err.stack}\n`;
      logText += `data: ${err.data instanceof String ? err.data : JSON.stringify(err.data)} \n`;
    } else if (err instanceof String) {
      logText = `name ${err} \n`;
    }

    this.loggerInstance.error(logText);
  }

  debug(msg) {
    const date = new Date();
    msg = msg instanceof String ? msg : JSON.stringify(msg);
    const logText = `${date.toLocaleString()} ${msg} `;
    this.loggerInstance.debug(logText);
  }
}

// 采用单例模式加载
let logger;
module.exports = (instance) => {
  if (!logger) {
    const logger4js = log4js.getLogger('newCoronavirus');
    logger = new Logger(instance || logger4js);
  }
  return logger;
};
