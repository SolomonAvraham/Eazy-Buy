import Stripe from "stripe";

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
    const session = stripe.checkout.sessions.create({
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
    response.redirect(200, session.url);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
