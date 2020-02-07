const axios = require('axios');

const config = require('../config.json');

class NewCoronavirusApi {
  /**
   *
   * @static
   * @description 获取病毒数据
   * @returns {Promise<object>} 病毒数据
   * @memberof NewCoronavirusApi
   */
  static async getBaseDate() {
    try {
      // TODO API存在限流
      const {
        url, version, appid, appsecret,
      } = config.tianqiapi;
      const { data: response } = await axios.get(url, {
        params: {
          version,
          appid,
          appsecret,
        },
      });
      if (response.errcode === 0) {
        return response;
      }
      throw new Error('返回结果错误');
    } catch (error) {
      console.error('getBaseDate error', error);
      throw error;
    }
  }
}


module.exports = NewCoronavirusApi;
