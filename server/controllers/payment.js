import Stripe from "stripe";
const secretKey = process.env.SECRET_STRIPE;
const stripe = Stripe(secretKey);

const payment = async (request, response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "ils",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://http://127.0.0.1:5173/success",
      cancel_url: "http://http://127.0.0.1:5173/cancel",
    });

    res.redirect(303, session.url);
  } catch (err) {}
};

export default payment;