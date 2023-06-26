import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {

  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
