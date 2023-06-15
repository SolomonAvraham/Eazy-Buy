import express from "express";
import payment from "../controllers/payment";

const router = express.Router();

router.post("/charge",payment);

export default router;

paymentRoute;
