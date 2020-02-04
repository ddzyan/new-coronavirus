/* 省份病毒数据 */
module.exports = (sequelize, DataTypes) => {
  const areaDate = sequelize.define('areaDate', {
    id: {
      type: DataTypes.BIGINT(12).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    areaId: {
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
  areaDate.associate = (models) => {
    models.areaDate.belongsTo(models.areaInfo, {
      foreignKey: 'areaId',
      onDelete: 'CASCADE',
      targetKey: 'id',
    });
  };

  return areaDate;
};
