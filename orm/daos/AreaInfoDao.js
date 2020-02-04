const models = require('../models');

class AreaInfoDao {
  constructor() {
    this.model = models.areaInfo;
  }

  /**
   *
   * @description 保存省份信息
   * @param {string} provinceName 省名称
   * @param {number} locationId 唯一ID
   * @param {string} comment 备注
   * @returns {Promise<object>} 省份信息
   * @memberof AreaInfoDao
   */
  async findOrCreateArea(provinceName, locationId, comment) {
    try {
      const areaInfoResult = await this.model.findOrCreate({
        where: {
          locationId,
          provinceName,
        },
        defaults: {
          provinceName, locationId, comment,
        },
      });

      return Array.isArray(areaInfoResult) && areaInfoResult.length > 0 ? areaInfoResult[0] : null;
    } catch (error) {
      console.error('findOrCreateArea error', error);
      throw error;
    }
  }
}

module.exports = AreaInfoDao;
