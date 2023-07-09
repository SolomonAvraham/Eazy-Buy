import Stripe from "stripe";
import User from "../models/client.js";

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
  const lineItems = request.body;

  try {
    if (lineItems.length === 0) {
      return response.status(404).send({ message: "Products not found" });
    }

    const stripe = new Stripe(process.env.SECRET_KEY_STRIPE ?? "", {
      apiVersion: "2020-08-27",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems.map((item) => ({
        price: item.price,
        quantity: item.quantity,
      })),
      currency: "ILS",
      mode: "payment",
      success_url: "http://127.0.0.1:5173/success",
      cancel_url: "http://127.0.0.1:5173/cancel",
    });

    return response.status(200).json({ redirectUrl: session.url });
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
    console.log(userId, product);
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    user.cart.push(product);
    await user.save();
    response.json({ message: "User cart updated successfully" });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserCart = async (request, response) => {
  try {
    const { userId, productId } = request.body;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    const productExist = user.cart.find((product) => product.id === productId);

    if (productExist === undefined) {
      return response.status(404).json({ error: "Product not found in cart" });
    }

    const productIndex = user.cart.findIndex((product) => {
      return product.id === productId;
    });

    if (productIndex === -1) {
      return response.status(404).json({ error: "Product not found in cart" });
    }

    user.cart.splice(productIndex, 1);
    await user.save();

    response.json({
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
};

//prod_O6JbppxeVmA9fv
//649c65c800941dd2444f7a05


 