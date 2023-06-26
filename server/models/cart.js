import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    productName: {
      typeof: String,
    },
    cart: {
      typeof: Array,
    },
    prise: Number,
    isExist: Boolean,
    madeIn: String,
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
