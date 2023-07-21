const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


  
  
  // LOGIN
  
  router.post('/login', async (req, res) => {
    try {
      console.log(req.body.email)
      const user = await User.findOne({ email: req.body.email });
  
      console.log(user)

      if (!user) {
        return res.status(401).json("Email");
      }

      req.session.userId = user._id;

      console.log(req.session.userId)
  
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
  
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
      const inputPassword = req.body.password
  
      if (originalPassword !== inputPassword) {
        return res.status(401).json("Wrong Password");
      }
  
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
  
      console.log(accessToken)
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // LOGOUT
  router.post("/logout", (req, res) => {
    delete req.session.userId; // or req.session.destroy();
    localStorage.removeItem('token');
    window.location.reload();
    res.status(200).json({ message: 'Logout successful' });
  });
  
  

module.exports = router;