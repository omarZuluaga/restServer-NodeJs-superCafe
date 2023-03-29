const Joi = require('joi');

const name = Joi.string();

const createCategory = Joi.object({
  name: name.required(),
});

module.exports = { 
  createCategory
}