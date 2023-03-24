const { Router } = require('express');
const { check } = require('express-validator');
const login = require('../controllers/auth');
const { createCategory } = require('../controllers/categories');
const { validateFields } = require('../middlewares/field-validation');
const jwtValidator = require('../middlewares/jwt-validator');

const router = Router();

router.get('/');

router.get('/:id');

router.post('/', 
  jwtValidator,
  check('name', 'name is required').not().isEmpty(),
  validateFields,
  createCategory);


router.put('/:id');

router.delete('/:id');

module.exports = router;