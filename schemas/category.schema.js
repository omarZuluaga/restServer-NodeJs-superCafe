const Joi = require('joi');

const name = Joi.string();
const id = Joi.string().hex().length(24);

const createCategory = Joi.object({
  name: name.required(),
});

getCategorySchema = Joi.object({
  id: id.required()
});

module.exports = { 
  createCategory,
  getCategorySchema
}