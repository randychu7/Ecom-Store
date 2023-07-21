const jwt = require("jsonwebtoken");
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const verifyToken = asyncHandler(async (req, res, next) => {

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
    }
  }

  if(!token){
    res.status(401).json({message: 'Not authorized, no token'})
  }
})

  //   const authHeader = req.headers.authorization;
  //   if (authHeader) {
  //     const token = authHeader.split(" ")[1];
  //     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
  //       if (err) res.status(403).json("Token is not valid!");
  //       req.user = user;
  //       next();
  //     });
  //   } else {
  //     return res.status(401).json("You are not authenticated!");
  //   }
  // };
  

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
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


// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//         if (err) res.status(403).json("Token is not valid!");
//         req.user = user;
//         next();
//       });
//     } else {
//       return res.status(401).json("You are not authenticated!");
//     }
//   };
  

// const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to do that!");
//     }
//   });
// };

// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to do that!");
//     }
//   });
// };

// module.exports = {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// };