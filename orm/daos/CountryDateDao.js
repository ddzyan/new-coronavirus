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
 * @param {string} params.date 获取时间
 * @param {number} params.diagnosed 确认人数
 * @param {number} params.suspect 疑似人数
 * @param {number} params.death 死亡人数
 * @param {number} params.cured 健康人数
 * @memberof CountryDateDao
 * @returns {Promise<Object>} 保存数据是否已经添加
 */
  async findOrCreateCountryDate(params) {
    try {
      const {
        createdAt, diagnosed, suspect, death, cured,
      } = params;
      const countryDate = await this.model.findOrCreate({
        where: {
          createdAt,
        },
        defaults: {
          confirmedCount: diagnosed,
          suspectedCount: suspect,
          curedCount: death,
          deadCount: cured,
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
