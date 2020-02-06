const models = require('../models');
const logger = require('../../utils/Logger')();

class CityInfoDao {
  constructor() {
    this.model = models.cityInfo;
  }


  /**
   * @class CityInfoDao
   * @description 保存城市信息
   * @param {object} params - sql参数
   * @param {number} params.areaId 省份ID
   * @param {string} params.cityName 城市名称
   * @returns {Promise<object>} 城市信息
   * @memberof CityInfoDao
   */
  async findOrCreateCity(params) {
    try {
      const { areaId, cityName } = params;
      const cityInfoResult = await this.model.findOrCreate({
        where: { areaId, cityName },
        defaults: {
          areaId, cityName,
        },
      });

      return Array.isArray(cityInfoResult) && cityInfoResult.length > 0 ? cityInfoResult[0] : null;
    } catch (error) {
      error.data = params;
      logger.error('findOrCreateArea error', error);
      throw error;
    }
  }
}


module.exports = CityInfoDao;
