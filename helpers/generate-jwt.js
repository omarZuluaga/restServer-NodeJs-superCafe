const jwt = require('jsonwebtoken');

const generateJwt = ( uid ) => {

  const payload = { uid };

  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '4h'
  });

  return token;
}

module.exports = generateJwt;
