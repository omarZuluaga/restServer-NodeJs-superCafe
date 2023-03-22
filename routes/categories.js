const { Router } = require('express');
const { check } = require('express-validator');
const login = require('../controllers/auth');
const { validateFields } = require('../middlewares/field-validation');

const router = Router();

router.get('/', (req, res) => { 
  res.json('Todo OK');
});

router.get('/:id', (req, res) => { 
  res.json('Todo OK');
});

router.post('/', (req, res) => { 
  res.json('Todo OK');
});

router.put('/:id', (req, res) => { 
  res.json('Todo OK');
});

router.delete('/:id', (req, res) => { 
  res.json('Todo OK');
});

module.exports = router;