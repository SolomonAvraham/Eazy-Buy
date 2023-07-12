import express from "express";
import { register, login, getUserById, removeAndAddFromCart } from "../controllers/client.js";
 
const router = express.Router();

router.post("/register", register); 
router.post("/login", login);
router.get("/user/:id", getUserById);
router.get("/removeCart/:id", removeAndAddFromCart);

export default router;
