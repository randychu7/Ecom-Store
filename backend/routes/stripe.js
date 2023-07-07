const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);
const Cart = require("../models/cart");
const Product = require("../models/product");

router.post("/payment", async (req, res) => {
  try {
    const { userId, items } = req.body;

    const cart = await Cart.findOne({ userId });

    const lineItems = await Promise.all(
      items.map(async (item) => {
        const cartItem = cart.products.find((cartProduct) => cartProduct.productId === item.id);
        const product = await Product.findById(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.priceInCents,
          },
          quantity: cartItem.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      // success_url: `${process.env.CLIENT_URL}/success.html`,
      // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;



// router.post("/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

module.exports = router;