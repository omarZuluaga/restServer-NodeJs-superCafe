const { validationResult } = require('express-validator');
const CategoryService = require('../service/category.service');

const categoryService = new CategoryService();

const createCategory = async (req, res, next) => { 

  console.log(validationResult(req));

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
}


module.exports = {
  createCategory
}