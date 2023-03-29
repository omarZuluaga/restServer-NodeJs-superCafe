const { Router } = require('express');
const { validateFields } = require('../middlewares/field-validation');
const { generateAuth } = require('../schemas/auth.schema');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateJwt = require('../helpers/generate-jwt');

const router = Router();

router.post('/login',
  validateFields(generateAuth, 'body'),
  async(req, res, next) => { 
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      console.log(user);

      if( !user ){ 
        return res.status(400).json({
          msg: 'User not found'
        });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if( !matchPassword ) {
        return res.status(400).json({
          msg: 'incorrect password'
        });
      }

      if( !user.isActive ) { 
        return res.status(404).json({
          msg: 'user deleted'
        });
      }

      const token = generateJwt( user.id );

      res.json({
        user,
        token
      });

    } catch (error) {
      return res.status(500).json({
        msg: error.message
      });
    }
    });

module.exports = router;