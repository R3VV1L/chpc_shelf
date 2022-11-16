const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

sequelize
  .authenticate()
  .then(() => console.log("Подключение успех."))
  .catch((err) => console.error("Подключение ошибка: ", err));

module.exports = sequelize;
