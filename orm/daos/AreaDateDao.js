const models = require('../models');
const logger = require('../../utils/Logger')();

class AreaDateDao {
  constructor() {
    this.model = models.areaDate;
  }

  /**
   * @class AreaDateDao
   * @description 保存省份病毒数据
   * @param {object} param -  sql 参数
   * @param {string} param.createdAt - 日期
   * @param {number} param.areaId - 省份iD
   * @param {number} param.confirmedCount - 确认人数
   * @param {number} param.suspectedCount - 疑似人数
   * @param {number} param.curedCount - 健康人数
   * @param {number} param.deadCount - 死亡人数
   * @memberof AreaDateDao
   * @returns {Promise<object>} 省份病毒数据
   */
  async findOrCreateAreaDate(param) {
    try {
      const {
        createdAt, areaId, confirmedCount, suspectedCount, curedCount, deadCount,
      } = param;
      const areaDate = await this.model.findOrCreate({
        where: {
          createdAt,
          areaId,
        },
        defaults: {
          areaId,
          confirmedCount,
          suspectedCount,
          curedCount,
          deadCount,
          createdAt,
        },
      });
      return areaDate;
    } catch (error) {
      error.data = param;
      logger.error('findOrCreateAreaDate error', error);
      throw error;
    }
  }
}

module.exports = AreaDateDao;
