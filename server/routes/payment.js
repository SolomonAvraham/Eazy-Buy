import express from "express";
import { getStripeProducts } from "../controllers/payment.js";

const router = express.Router();
router.get("/products", getStripeProducts);

export default router;
