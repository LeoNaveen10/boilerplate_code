module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: "India"
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    }
  });
  return User;
};

