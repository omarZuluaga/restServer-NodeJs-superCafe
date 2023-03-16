
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserService { 

  constructor() {}

  async create(body) {

    const {username, email, password, role} = body;
    const user = new User({ username, email, password, role });

    user.password = await this.hashPassword(password);

    await user.save();

    return user;
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
}

module.exports = UserService;