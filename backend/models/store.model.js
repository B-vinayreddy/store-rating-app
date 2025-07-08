module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(400)
    }
  });

  return Store;
};
