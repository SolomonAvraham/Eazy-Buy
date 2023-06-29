import express from "express";
import {
  deleteUserCart,
  getStripeProducts,
  putStripePurchase,
  updateUserCart,
  getStripeProductById
} from "../controllers/payment.js";

const router = express.Router();

router.get("/products", getStripeProducts);
router.post("/create-checkout-session",putStripePurchase);
router.post("/update", updateUserCart);
router.delete("/delete", deleteUserCart);
router.post("/create-checkout-session", putStripePurchase);
router.get("/productById/:id", getStripeProductById);

export default router;
