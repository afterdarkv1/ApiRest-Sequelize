import { Router } from "express";
import { createUser, deleteUser, getUser, getUserProducts, getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

router.get("/:id/products", getUserProducts);

export default router;
