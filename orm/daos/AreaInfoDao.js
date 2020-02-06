const models = require('../models');
const logger = require('../../utils/Logger')();


class AreaInfoDao {
  constructor() {
    this.model = models.areaInfo;
  }

  /**
   *
   * @description 保存省份信息
   * @param {object} params - sql 参数
   * @param {string} params.provinceName -省名称
   * @param {number} params.locationId -唯一ID
   * @param {string} params.comment -备注
   * @returns {Promise<object>} 省份信息
   * @memberof AreaInfoDao
   */
  async findOrCreateArea(params) {
    try {
      const { provinceName, locationId, comment } = params;
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
      error.data = params;
      logger.error('findOrCreateArea error', error);
      throw error;
    }
  }
}

module.exports = AreaInfoDao;
