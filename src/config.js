import { config } from "dotenv";

config();

export const { DB_DATABASE, DB_DATABASE_TEST, NODE_ENV } = process.env;

export const PORT = process.env.PORT || 4003;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";


export const DB_CONECTION = NODE_ENV === "test" ? DB_DATABASE_TEST : DB_DATABASE;

/*
export const DB_DATABASE = process.env.DB_DATABASE || "MYSHOP";
export const DB_DATABASE_TEST = process.env.DB_DATABASE_TEST || "myshop_test";
*/
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DIALECT = process.env.DB_DIALECT || "mysql";
