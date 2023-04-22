const Joi = require('joi');

const name = Joi.string().min(3)
const id = Joi.string().hex().length(24);
const price = Joi.number();
const description = Joi.string().min(3);

const createProduct = Joi.object({
  name: name.required(),
  price,
  description,
});

const getProductById = Joi.object({
  id: id.required(),
});

module.exports = {
  createProduct,
  getProductById
}