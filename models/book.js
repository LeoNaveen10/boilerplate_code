module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    
    const Books = sequelize.define('Book', {
    
    lsnb_no : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : false
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publishedOn: {
        type: DataTypes.STRING,
        allowNull : false
      },
      addedOn : {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      }
    });
    return Books;
  };
  