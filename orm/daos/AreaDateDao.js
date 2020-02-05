const models = require('../models');

class AreaDateDao {
  constructor() {
    this.model = models.areaDate;
  }

  /**
   * @class AreaDateDao
   * @description 保存省份病毒数据
   * @param {number} areaId
   * @param {number} confirmedCount
   * @param {number} suspectedCount
   * @param {number} curedCount
   * @param {number} deadCount
   * @memberof AreaDateDao
   * @returns {Promise<object>} 省份病毒数据
   */
  (date, areaId, confirmedCount, suspectedCount, curedCount, deadCount) {
  try {
    const areaDate = await this.model.findOrCreate({
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
    return areaDate;
  } catch (error) {
    console.error('findOrCreateAreaDate error', error);
    throw error;
  }
}
}

module.exports = AreaDateDao;
