import { DataTypes } from 'sequelize'
import sequelize from '../database/connect.js'
import User from './user-model.js'

const Role = sequelize.define(
  'Role',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      foreignKey: true,
    },
    role: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)


export default Role
