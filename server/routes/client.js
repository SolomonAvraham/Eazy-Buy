import express from "express";
import { register, login, getUserById } from "../controllers/client.js";
 
const router = express.Router();

router.post("/register", register); 
router.post("/login", login);
router.get("/user/:id", getUserById);

export default router;
