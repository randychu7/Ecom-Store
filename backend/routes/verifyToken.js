const jwt = require("jsonwebtoken");
const User = require('../models/User')

const verifyToken = async (req, res, next) => {

  let token

  if(req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SEC)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    }catch (error) {
      console.error(error)
      res.status(401).json({message: 'Not authorized, token failed'})
      return // Remember to stop further execution when an error occurs
    }
  }

  if(!token){
    res.status(401).json({message: 'Not authorized, no token'})
  }
}

const verifyTokenAndAuthorization = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
