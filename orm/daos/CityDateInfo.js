const models = require('../models');
const logger = require('../../utils/Logger')();

class CityDateInfo {
  constructor() {
    this.model = models.cityDate;
  }

  /**
   * @class CityDateInfo
   * @description 保存城市病毒数据
   * @param {object} params - sql参数
   * @param {number} params.cityId - 城市id
   * @param {string} params.createdAt - 创建时间
   * @param {number} params.confirmedCount 确认人数
   * @param {number} params.suspectedCount 疑似人数
   * @param {number} params.curedCount 健康人数
   * @param {number} params.deadCount 死亡人数
   * @returns
   * @memberof CityDateInfo
   */
  async findOrCreateCityDate(params) {
    try {
      const {
        cityId, createdAt, confirmedCount, suspectedCount, curedCount, deadCount,
      } = params;
      const cityDateResult = await this.model.findOrCreate({
        where: {
          createdAt,
          cityId,
        },
        defaults: {
          cityId, createdAt, confirmedCount, suspectedCount, curedCount, deadCount,
        },
      });
      return Array.isArray(cityDateResult) && cityDateResult.length > 0 ? cityDateResult[0] : null;
    } catch (error) {
      error.data = params;
      logger.error('findOrCreateCityDate error', error);
      throw error;
    }
  }
}


module.exports = CityDateInfo;
