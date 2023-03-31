const Category  = require('../models/categories');
const boom = require('@hapi/boom');

class CategoryService { 

  constructor() { }

  async find(limit, skipIndex) {
    const categories = await Category.find()
      .skip(skipIndex)
      .limit(limit)
      .populate('user');
    return categories;
  }

  async findById(id) {
    const category = await Category.findById(id).populate('user');

    if(!category) { 
      throw boom.notFound('Category not found')
    }

    return category;
  }

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

  async update(changes, id) {
    const categoryUpdated = await Category.findOneAndUpdate(id, changes);

    return categoryUpdated;
  }

  async delete(id) {
    const userInactivated = await Category.findOneAndUpdate(id, {state: false}, {new: true});

    return userInactivated;
  }
  
}

module.exports = CategoryService;