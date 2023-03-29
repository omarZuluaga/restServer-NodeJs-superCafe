const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(5);

const generateAuth = Joi.object({
  email: email.required(),
  password: password.required()
});

module.exports = {
  generateAuth
}