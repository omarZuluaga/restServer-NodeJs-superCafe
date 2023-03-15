
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserService { 

  constructor() {}

  async create(user) {
    const user = await User.create({
      ...user,
      password: await this.hashPassword(user.password)
    });

  }

  async hashPassword(password) { 
    const salt = bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async findAll() {
    
    const users = await User.find();
    return users;

  } 

  async findById(id) {
    return await User.findById(id);
  }

  async update() {}

  async delete() {}
}

module.exports = UserService;