const models = require('../models');

class YesterdayDateDao {
  constructor() {
    this.model = models.yesterdayDate;
  }

  /**
   * @class YesterdayDateDao
   * @description 保存省份病毒数据
   * @param {date} date
   * @param {number} areaId
   * @param {number} confirmedCount
   * @param {number} suspectedCount
   * @param {number} curedCount
   * @param {number} deadCount
   * @memberof YesterdayDateDao
   * @returns {Promise<object>} 省份病毒数据
   */
  async findOrCreateYesterdayDate(date, areaId, confirmedCount, suspectedCount, curedCount, deadCount) {
    try {
      const yesterdayDateResult = await this.model.findOrCreate({
        where: {
          createdAt: date,
          areaId,
        },
        defaults: {
          areaId,
          confirmedCount,
          suspectedCount,
          curedCount,
          deadCount,
        },
      });
      return Array.isArray(yesterdayDateResult) && yesterdayDateResult.length > 0 ? yesterdayDateResult[0] : null;
    } catch (error) {
      console.error('findOrCreateYesterdayDate error', error);
      throw error;
    }
  }
}

module.exports = YesterdayDateDao;
