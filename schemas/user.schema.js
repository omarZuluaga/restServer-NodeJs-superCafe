const Joi = require('joi');

const email = Joi.string().email();
const id = Joi.string().hex().length(24);
const username = Joi.string();
const password = Joi.string().min(8);
const role = Joi.string().min(3);

const createUserSchema = Joi.object({
  email: email.required(),
  username: username.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { 
  createUserSchema,
  updateUserSchema,
  getUserSchema
}