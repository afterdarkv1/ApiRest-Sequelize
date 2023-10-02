import { Product } from "./Product.js";
import database from "../db/db.js";
import { DataTypes } from "sequelize";

export const User = database.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    gmail: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  }
);

User.hasMany(Product, {
  foreignkey: "userId",
  sourceKey: "id",
});
Product.belongsTo(User, { foreignkey: "userId", targetId: "id" });
