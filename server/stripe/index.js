import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE,{
    apiVersion: '2022-11-15'
});

export default stripe;