const payment = async (request, response) => {
  const { token, amount, currency } = request.body;

  try {
    const charge = await stripe.charge.create({
      amount,
      currency,
      source: token,
      description: "Payment description",
    });
  } catch (error) {
    request.status(400).json({ success: false, error: error.message });
  }
};
export default payment;
