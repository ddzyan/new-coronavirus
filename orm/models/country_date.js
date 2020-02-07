/* 国家总病毒数据 */
module.exports = (sequelize, DataTypes) => {
  const countryDate = sequelize.define('countryDate', {
    id: {
      type: DataTypes.BIGINT(12).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    confirmedCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '确认人数',
      set(val) {
        val = typeof (val) === 'number' ? val : 0;
        this.setDataValue('confirmedCount', val);
      },
    },
    suspectedCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '疑似人数',
      set(val) {
        val = typeof (val) === 'number' ? val : 0;
        this.setDataValue('suspectedCount', val);
      },
    },
    curedCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '健康人数',
      set(val) {
        val = typeof (val) === 'number' ? val : 0;
        this.setDataValue('curedCount', val);
      },
    },
    deadCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '死亡人数',
      set(val) {
        val = typeof (val) === 'number' ? val : 0;
        this.setDataValue('deadCount', val);
      },
    },
  });

  return countryDate;
};
