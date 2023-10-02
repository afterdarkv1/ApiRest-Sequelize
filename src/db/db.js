import Sequelize from "sequelize";
import dotenv from "dotenv";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DB_DIALECT
} from "../config.js";

dotenv.config();

export const database = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
});

export default database;

