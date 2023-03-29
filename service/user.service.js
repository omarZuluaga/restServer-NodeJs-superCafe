
const User = require('../models/user');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class UserService { 

  constructor() {}

  async create(body) {
    const {username, email, password, role} = body;
    const user = new User({ username, email, password, role });

    user.password = await this.hashPassword(password);

    await user.save();

    return user;
  }

  
  async findAll() {
    
    const users = await User.find();
    return users;
    
  } 
  
  async findById(id) {
    const user = await User.findById(id);

    if(!user) {
      throw boom.notFound('User not found');
    }
  }
  
  async update(id, userChanges) {
    
    const { password, google, ...otherUserChanges} = userChanges;
    
    
    if(password) { 
      otherUserChanges.password = await this.hashPassword(password);
    }
    
    const userUpdated = await User.findOneAndUpdate(id, otherUserChanges);
    
    return userUpdated;
    
  }
  
  async delete(id) {
    
    const userInactivated = await User.findOneAndUpdate(id, {isActive: false});
    return userInactivated;
  
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

module.exports = UserService;