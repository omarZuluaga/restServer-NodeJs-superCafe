const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  img: { 
    type: String
  },
  role: { 
    type: String,
    required: true,
    enum: ['ADMIN', 'USER']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function() { 
  const { __v, password, _id, ...user} = this.toObject();
  user.uid = _id
  return user;
}

module.exports = model('User', UserSchema);