import Stripe from "stripe";

export async function getStripeProducts(req, res) {
  const stripe = new Stripe(process.env.SECRET_KEY_STRIPE ?? "", {
    apiVersion: "2020-08-27",
  });
  const product = await stripe.prices.list({
    expand: ["data.product"],
  });

  return res.json(product.data);
}

