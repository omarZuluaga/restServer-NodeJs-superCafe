const { Router } = require('express');
const { validateFields } = require('../middlewares/field-validation');
const jwtValidator = require('../middlewares/jwt-validator');
const { createCategory } = require('../schemas/category.schema');
const CategoryService = require('../service/category.service');

const categoryService = new CategoryService();
const router = Router();

router.get('/',
  async(req, res, next) => { 
    const {page = 1, limit = 10 } = req.query;

    try {
      const categories = await categoryService.find();

      res.status(200).json({
        categories
      })
    } catch (error) {
      next(error);
    }
  });

router.get('/:id');

router.post('/', 
  jwtValidator,
  validateFields(createCategory, 'body'),
  async(req, res, next) => { 
    try {
      const name = req.body.name.toUpperCase();
      
      const categoryToCreate = { 
        name,
        user: req.user._id
      }
      const categoryCreated = await categoryService.save(categoryToCreate);
  
      res.status(201).json({
        message: 'category created successfully',
        categoryCreated
      });
  
    } catch (error) {
      next(error);
    }
  });


router.put('/:id');

router.delete('/:id');

module.exports = router;