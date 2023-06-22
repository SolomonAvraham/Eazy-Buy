import express from "express";
import payment from "../controllers/payment.js"
const router = express.Router();
router.post("/create-checkout-session", payment);

export default router