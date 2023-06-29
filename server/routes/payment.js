import express from "express";
import {
  getStripeProducts,
  putStripePurchase,
  getStripeProductById
} from "../controllers/payment.js";

const router = express.Router();
router.get("/products", getStripeProducts);
router.post("/create-checkout-session", putStripePurchase);
router.get("/productById/:id", getStripeProductById);

export default router;
