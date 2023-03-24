const Category  = require('../models/categories');
const boom = require('@hapi/boom');

class CategoryService { 

  constructor() { }

  async find() {}

  async findById(id) {}

  async save(category) {
    await this.existingCategory(category.name);
    const categoryToSave = new Category(category)

    await categoryToSave.save();

    return categoryToSave;
  }

  async existingCategory(name) { 
    const categoryFromDb = await this.findByName({name});

    if(categoryFromDb) { 
      throw boom.badRequest('category already created');
    }
  }

  async findByName(name) { 
    return await Category.findOne(name);
  }

  async update(changes, id) {}

  async delete(id) {}
  
}

module.exports = CategoryService;