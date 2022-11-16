const sequelize = require("../database/db.js");
const { DataTypes, Model } = require("sequelize");
class Post extends Model {
  otherPublicField;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Заголовок
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // Описание
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Фильм, Игра, Книга ...
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Если (Фильм, Игра, Книга) то ...(Ужас, Шутер, Фантастика)
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

module.exports = Post;
