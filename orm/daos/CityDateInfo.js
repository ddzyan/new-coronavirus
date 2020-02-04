const models = require('../models');

class CityDateInfo {
  constructor() {
    this.model = models.cityDate;
  }

  /**
   * @class CityDateInfo
   * @description 保存城市病毒数据
   * @param {number} cityId 城市id
   * @param {date} date 创建时间
   * @param {number} confirmedCount 确认人数
   * @param {number} suspectedCount 疑似人数
   * @param {number} curedCount 健康人数
   * @param {number} deadCount 死亡人数
   * @returns
   * @memberof CityDateInfo
   */
  async findOrCreateCityDate(cityId, date, confirmedCount, suspectedCount, curedCount, deadCount) {
    try {
      const cityDateResult = await this.model.findOrCreate({
        where: {
          createdAt: date,
          cityId,
        },
        defaults: {
          cityId, createdAt: date, confirmedCount, suspectedCount, curedCount, deadCount,
        },
      });
      return Array.isArray(cityDateResult) && cityDateResult.length > 0 ? cityDateResult[0] : null;
    } catch (error) {
      console.error('findOrCreateCityDate error', error);
      throw error;
    }
  }
}


module.exports = CityDateInfo;
