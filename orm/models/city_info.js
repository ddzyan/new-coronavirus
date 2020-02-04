/* 城市数据 */
module.exports = (sequelize, DataTypes) => {
  const cityInfo = sequelize.define('cityInfo', {
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
      comment: '省Id',
    },
    cityName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: '城市名称',
    },
  });

  /*
  * 设定关联关系
  */
  cityInfo.associate = (models) => {
    models.cityInfo.belongsTo(models.areaInfo, {
      foreignKey: 'areaId', // 外检名称
      onDelete: 'CASCADE', // 删除时候执行的操作
      targetKey: 'id', // 目标建名称
    });
  };

  return cityInfo;
};
