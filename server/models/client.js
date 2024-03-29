import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    address: String,
    cart: [{ type: Object }],
    productsPurchased: [{ type: Object }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;


