/* 省数据 */
module.exports = (sequelize, DataTypes) => {
  const areaInfo = sequelize.define('areaInfo', {
    id: {
      type: DataTypes.BIGINT(12).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    locationId: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: '邮编',
    },
    provinceName: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: '省名称',
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '备注',
    },
  });

  return areaInfo;
};
