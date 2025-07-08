module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [20, 60]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    address: {
      type: DataTypes.STRING(400)
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('Admin', 'User', 'Owner'),
      defaultValue: 'User'
    }
  });

  return User;
};
