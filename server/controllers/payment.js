import Stripe from "stripe";
import User from "../models/client";

export async function getStripeProducts(request, response) {
  try {
    const stripe = new Stripe(process.env.SECRET_KEY_STRIPE ?? "", {
      apiVersion: "2020-08-27",
    });
    const product = await stripe.prices.list({
      expand: ["data.product"],
    });
    return response.json(product.data);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
}

export const putStripePurchase = async (request, response) => {
  try {
    const stripe = new Stripe(process.env.SECRET_KEY_STRIPE ?? "", {
      apiVersion: "2020-08-27",
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "ILS",
            product_data: {
              name: "מסך מחשב",
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://127.0.0.1:5173/success",
      cancel_url: "http://127.0.0.1:5173/cancel",
    });
    response.status(200).json({ redirectUrl: session.url });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const getStripeProductById = async (request, response) => {
  const productId = request.params.id;
  try {
    const stripe = new Stripe(process.env.SECRET_KEY_STRIPE ?? "", {
      apiVersion: "2020-08-27",
    });
    const product = await stripe.products.retrieve(productId);
    return response.json(product);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const updateUserCart = async (request, response) => {
  try {
    const { userId, product } = request.body;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    user.products.push(product);
    await user.save();
    response.json({ message: "User cart updated successfully" });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
};
