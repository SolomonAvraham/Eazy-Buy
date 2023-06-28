import express from "express";
import {
  getStripeProducts,
  putStripePurchase,
  updateUserCart,
} from "../controllers/payment.js";

const router = express.Router();

router.get("/products", getStripeProducts);
router.post("/create-checkout-session",putStripePurchase);
router.post("/update", updateUserCart);

export default router;
