const models = require('../models');

class CityInfoDao {
  constructor() {
    this.model = models.cityInfo;
  }


  /**
   * @class CityInfoDao
   * @description 保存城市信息
   * @param {number} areaId 省份ID
   * @param {string} cityName 城市名称
   * @returns {Promise<object>} 城市信息
   * @memberof CityInfoDao
   */
  async findOrCreateCity(areaId, cityName) {
    try {
      const cityInfoResult = await this.model.findOrCreate({
        where: { areaId, cityName },
        defaults: {
          areaId, cityName,
        },
      });

      return Array.isArray(cityInfoResult) && cityInfoResult.length > 0 ? cityInfoResult[0] : null;
    } catch (error) {
      console.error('findOrCreateArea error', error);
      throw error;
    }
  }
}


module.exports = CityInfoDao;
