const { 
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch 
} = require('../controllers/usuarios');

const { Router } = require('express');
const { check } = require('express-validator');
const  Role  = require('../models/role');

const { validateFields } = require('../middlewares/field-validation');
const {
  isValidRol,
  isEmailExist,
  isUserExist,
} = require("../helpers/db-validators");
const jwtValidator = require('../middlewares/jwt-validator');
const isAdminRole = require('../middlewares/role-validator');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', 
  check('id', 'is not a valid id').isMongoId().custom(isUserExist),
  validateFields,
  usuariosPut );

router.post('/', 
  check('email').isEmail().custom(isEmailExist),
  check('username', 'username is required').not().isEmpty(),
  check('password', 'password must have more than 6 characters').isLength({ min: 6 }),
  check('role').custom(isValidRol),
  validateFields,
  usuariosPost );

router.delete('/:id', 
  jwtValidator,
  isAdminRole,
  check('id', 'not a valid id').isMongoId().custom( isUserExist ),
  validateFields,
  usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;