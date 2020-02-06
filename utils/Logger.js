
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
    logger = new Logger(instance);
  }
  return logger;
};
