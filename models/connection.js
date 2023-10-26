const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("idealdatabase", "newuser", "password", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("-----Connection has been established successfully.------");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require("./contact")(DataTypes, sequelize);
db.user = require("./user")(DataTypes, sequelize);
db.sequelize.sync({ force: false });

module.exports = db;
