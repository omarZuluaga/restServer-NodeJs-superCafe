const Category = require('./categories.js');
const Role = require('./role.js');
const Server = require('./server.js');
const User = require('./user.js');

module.exports = { 
  ...Category,
  ...Role,
  ...Server,
  ...User,
}