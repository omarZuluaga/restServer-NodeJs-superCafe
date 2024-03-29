const { Router } = require('express');
const { validateFields } = require('../middlewares/field-validation');
const jwtValidator = require('../middlewares/jwt-validator');
const { createCategory, getCategorySchema } = require('../schemas/category.schema');
const CategoryService = require('../service/category.service');

const categoryService = new CategoryService();
const router = Router();

router.get('/',
  async(req, res, next) => { 
    const {page = 1, limit = 10 } = req.query;
    const skipIndex = (page - 1) * limit;

    try {
      const categories = await categoryService.find(limit, skipIndex);

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


router.put('/:id',
  jwtValidator,
  validateFields(getCategorySchema, 'params'),
  async(req, res, next) => { 
      const { id } = req.params;

      try {
        const categoryUpdated = await categoryService.update(req.body, id);

        res.status(200).json({
          categoryUpdated
        });
      } catch (error) {
        next(error);
      }
    
  });

router.delete('/:id',
  jwtValidator,
  validateFields(getCategorySchema, 'params'),
  async(req, res, next) => { 
    const { id } = req.params;

    try {
      const categoryDeleted = await categoryService.delete(id);

      res.status(200).json({
        categoryDeleted
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;