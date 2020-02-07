const models = require('../models');
const logger = require('../../utils/Logger')();

class CountryDateDao {
  constructor() {
    this.model = models.countryDate;
  }

  async getCountryDateBycreatedAt(createdAt) {
    try {
      const result = await this.model.findOne({
        where: {
          createdAt,
        },
      });
      return result;
    } catch (error) {
      error.data = createdAt;
      logger.error('getCountryDateBycreatedAt error', error);
      throw error;
    }
  }

  /**
 *
 * @description 保存全国病毒数据
 * @param {object} params - sql参数
 * @param {string} params.createdAt 获取时间
 * @param {number} params.confirmedCount 确认人数
 * @param {number} params.suspectedCount 疑似人数
 * @param {number} params.deadCount 死亡人数
 * @param {number} params.curedCount 健康人数
 * @memberof CountryDateDao
 * @returns {Promise<Object>} 保存数据是否已经添加
 */
  async findOrCreateCountryDate(params) {
    try {
      const {
        createdAt, confirmedCount, suspectedCount, curedCount, deadCount,
      } = params;
      const countryDate = await this.model.findOrCreate({
        where: {
          createdAt,
        },
        defaults: {
          confirmedCount,
          suspectedCount,
          curedCount,
          deadCount,
          createdAt,
        },

      });
      return countryDate[1];
    } catch (error) {
      error.data = params;
      logger.error('saveCountryDate error', error);
      throw error;
    }
  }
}

module.exports = CountryDateDao;
