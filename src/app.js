import express from "express";
import morgan from "morgan";
import brandRoutes from "./routes/brands.routes.js";
import productRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/brands", brandRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);