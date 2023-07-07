const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

// Update the default value of the quantity field based on the provided value
cartSchema.pre("save", function (next) {
  this.products.forEach((product) => {
    if (!product.quantity || product.quantity < 1) {
      product.quantity = 1;
    }
  });
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
