const NewCoronavirusApi = require('./NewCoronavirusApi');
const daos = require('../orm/daos');

class NewCoronavirusReptilia {
  /**
   * @static
   * @class NewCoronavirusReptilia
   * @description 获取新型冠状病毒数据，并且保存数据库
   * @returns <Promise>
   */
  static async saveNewCoronavirusDate() {
    try {
      // 获取病毒数据
      const newCoronavirusDate = await NewCoronavirusApi.getBaseDate();
      // 控制台输出关键数据
      console.debug('获取病毒数据信息成功');
      // 解析数据
      const {
        diagnosed, suspect, death, cured, date: createdAt, area,
      } = newCoronavirusDate.data;

      // 保存全国病毒数据
      const saveCountryResult = await daos.CountryDateDao.findOrCreateCountryDate(createdAt, diagnosed, suspect, death, cured);
      console.debug(`全国数据${saveCountryResult ? '未保存，开始添加数据' : '已经保存'}`);
      if (saveCountryResult) {
        // 数据保存成功，继续保存省份病毒数据数据
        for (const areaItem of area) {
          const { provinceName, locationId, comment } = areaItem;
          // 保存省份信息
          const areaInfo = await daos.AreaInfoDao.findOrCreateArea(provinceName, locationId, comment);
          // todo 判断返回结果不为空
          const areaId = areaInfo.id;

          // 保存省份病毒信息
          const {
            confirmedCount, suspectedCount, curedCount, deadCount,
          } = areaItem;
          await daos.AreaDateDao.findOrCreateAreaDate(createdAt, areaId, confirmedCount, suspectedCount, curedCount, deadCount);
          console.debug(`${provinceName}省份病毒数据保存成功`);

          // 循环遍历城市数据
          const { cities } = areaItem;
          for (const city of cities) {
            const { cityName } = city;
            // 保存城市信息
            const cityInfoResult = await daos.CityInfoDao.findOrCreateCity(areaId, cityName);
            const cityId = cityInfoResult.id;

            // 保存城市病毒信息
            const {
              confirmedCount: cityConfirmedCount, suspectedCount: citySuspectedCount, curedCount: cityCuredCount, deadCount: cityDeadCount,
            } = city;
            await daos.CityDateInfo.findOrCreateCityDate(cityId, createdAt, cityConfirmedCount, citySuspectedCount, cityCuredCount, cityDeadCount);
          }

          console.debug('保存城市病毒信息和城市信息成功');
          // 保存省份昨日病毒增长信息
          const {
            confirmedCount: yesterdayConfirmedCount, suspectedCount: yesterdaySuspectedCount, curedCount: yesterdayCuredCount, deadCount: yesterdayDeadCount,
          } = areaItem.yesterdayIncreased;

          await daos.YesterdayDateDao.findOrCreateYesterdayDate(createdAt, areaId, yesterdayConfirmedCount, yesterdaySuspectedCount, yesterdayCuredCount, yesterdayDeadCount);
          console.debug(`${provinceName}保存省份昨日病毒增长信息成功`);
        }
      }
    } catch (error) {
      console.error('saveNewCoronavirusDate', error);
      throw error;
    }
  }
}


module.exports = NewCoronavirusReptilia;
