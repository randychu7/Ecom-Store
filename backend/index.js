const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const stripeRoutes = require('./routes/stripe');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.listen(process.env.PORT || 5080, () => {
  console.log('Server is running on port 5080');
});

app.use(express.json());
app.use(cors());
app.use("/api/checkout", stripeRoutes)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)


