const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async (req, res, next) => { 

  const token = req.header('token');

  if( !token ) { 
    return res.status(401).json({
      message: 'token empty'
    });
  }

  try {
    
    const {uid} = jwt.verify(token, process.env.SECRET);
    console.log("🚀 ~ file: jwt-validator.js:18 ~ jwtValidator ~ uid:", uid);

    const user = await User.findById(uid);

    if ( !user ) { 
      return res.status(404).json({
        message: 'user not found'
      });
    }

    if( !user.isActive ) { 
      return res.status(401).json({
        message: 'invalid token'
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'invalid token'
    })
  }

  next();
  
}

module.exports = jwtValidator;