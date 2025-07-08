const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);
db.Store = require('./store.model')(sequelize, Sequelize);
db.Rating = require('./rating.model')(sequelize, Sequelize);

db.User.hasMany(db.Rating);
db.Store.hasMany(db.Rating);
db.Rating.belongsTo(db.User);
db.Rating.belongsTo(db.Store);

module.exports = db;
