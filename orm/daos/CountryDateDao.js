const models = require('../models');

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
      console.error('getCountryDateBycreatedAt error', error);
      throw error;
    }
  }

  /**
 *
 * @description 保存全国病毒数据
 * @param {string} date 获取时间
 * @param {number} diagnosed 确认人数
 * @param {number} suspect 疑似人数
 * @param {number} death 死亡人数
 * @param {number} cured 健康人数
 * @memberof CountryDateDao
 * @returns {Promise<Object>} 保存数据是否已经添加
 */
  async findOrCreateCountryDate(date, diagnosed, suspect, death, cured) {
    try {
      const countryDate = await this.model.findOrCreate({
        where: {
          createdAt: date,
        },
        defaults: {
          confirmedCount: diagnosed,
          suspectedCount: suspect,
          curedCount: death,
          deadCount: cured,
          createdAt: date,
        },

      });
      return countryDate[1];
    } catch (error) {
      console.error('saveCountryDate error', error);
      throw error;
    }
  }
}

module.exports = CountryDateDao;
