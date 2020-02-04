/* 城市病毒数据 */
module.exports = (sequelize, DataTypes) => {
  const cityDate = sequelize.define('cityDate', {
    id: {
      type: DataTypes.BIGINT(12).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    cityId: {
      type: DataTypes.BIGINT(12).UNSIGNED,
      allowNull: false,
      comment: '城市Id',
    },
    confirmedCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '确认人数',
    },
    suspectedCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '疑似人数',
    },
    curedCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '健康人数',
    },
    deadCount: {
      type: DataTypes.INTEGER(7).UNSIGNED,
      allowNull: false,
      default: 0,
      comment: '死亡人数',
    },
  });

  /*
  * 设定关联关系
  */
  cityDate.associate = (models) => {
    models.cityDate.belongsTo(models.cityInfo, {
      foreignKey: 'cityId',
      onDelete: 'CASCADE',
      targetKey: 'id',
    });
  };

  return cityDate;
};
