const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');
const cors = require('cors');
const session = require('express-session');
const {verifyToken} = require('./routes/auth');

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
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Note: set secure to true if you are using https

  })
);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);


