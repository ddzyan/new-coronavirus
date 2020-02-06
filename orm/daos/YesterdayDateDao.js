const models = require('../models');
const logger = require('../../utils/Logger')();

class YesterdayDateDao {
  constructor() {
    this.model = models.yesterdayDate;
  }

  /**
   * @class YesterdayDateDao
   * @description 保存省份病毒数据
   * @param {object} params - sql参数
   * @param {string} params.createdAt
   * @param {number} params.areaId
   * @param {number} params.confirmedCount
   * @param {number} params.suspectedCount
   * @param {number} params.curedCount
   * @param {number} params.deadCount
   * @memberof YesterdayDateDao
   * @returns {Promise<object>} 省份病毒数据
   */
  async findOrCreateYesterdayDate(params) {
    try {
      const {
        createdAt, areaId, confirmedCount, suspectedCount, curedCount, deadCount,
      } = params;
      const yesterdayDateResult = await this.model.findOrCreate({
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
      return Array.isArray(yesterdayDateResult) && yesterdayDateResult.length > 0 ? yesterdayDateResult[0] : null;
    } catch (error) {
      error.date = params;
      logger.error('findOrCreateYesterdayDate error', error);
      throw error;
    }
  }
}

module.exports = YesterdayDateDao;
