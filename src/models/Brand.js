import { Product } from "./Product.js";
import database from "../db/db.js";
import { DataTypes } from "sequelize";

export const Brand = database.define(
  "brands",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  }
);

Brand.hasMany(Product, {
  foreignkey: "brandId",
  sourceKey: "id",
});
Product.belongsTo(Brand, { foreignkey: "brandId", targetId: "id" });
