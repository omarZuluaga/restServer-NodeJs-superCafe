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
const { isValidRol, isEmailExist } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', 
  check('email').isEmail().custom(isEmailExist),
  check('username', 'username is required').not().isEmpty(),
  check('password', 'password must have more than 6 characters').isLength({ min: 6 }),
  check('role').custom(isValidRol),
  validateFields,
  usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;