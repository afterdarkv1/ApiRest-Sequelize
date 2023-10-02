
import { DataTypes } from "sequelize";
import database from "../db/db.js";


export const Product = database.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    }, 
  },
  {
    timestamps: false,
  }
);
