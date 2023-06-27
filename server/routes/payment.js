import express from "express";
import {
  getStripeProducts,
  putStripePurchase,
} from "../controllers/payment.js";

const router = express.Router();
router.get("/products", getStripeProducts);
router.post("/create-checkout-session",putStripePurchase);

export default router;
