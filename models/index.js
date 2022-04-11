const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize);
db.book = require("./book")(sequelize,Sequelize);
db.role = require("./role")(sequelize,Sequelize);

// //we can use the link table to check whether the particular user already has rented book
db.user.belongsToMany(db.book,{
  through : "user_books",
  foreginKey : "user_id",
  otherKey : "book_id"
});

db.book.belongsToMany(db.user,{
  through : "user_books",
  foreginKey : "book_id",
  otherKey : "user_id"
});
db.role.belongsToMany(db.user,{
  through : "user_roles",
  foreginKey : "role_id",
  otherKey : "user_id"
});

db.user.belongsToMany(db.role ,{
  through : "user_roles",
  foreginKey : "user_id",
  otherKey : "roll_id"
});

db.Roles = ["user","admin"];
module.exports = db;