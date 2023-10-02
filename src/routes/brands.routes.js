import { Router } from "express";
import { createBrand, deleteBrand, getBrand, getBrandProducts, getBrands, updateBrand } from "../controllers/brand.controller.js";


const router = Router();

router.post("/", createBrand);
router.get("/", getBrands);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrand);

router.get("/:id/products", getBrandProducts);

export default router;
