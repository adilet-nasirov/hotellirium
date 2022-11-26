const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://stripe-checkout-next-js-demo.vercel.app";

  const transformedItem = {
    quantity: 2,
    price_data: {
      currency: "usd",
      product_data: {
        images: [item.images[0]],
        name: item.listingName,
        description: "reserve the hotel",
      },
      unit_amount: 120 * 100,
    },
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: item.images[0],
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
