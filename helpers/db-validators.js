const Role = require('../models/role');
const User = require('../models/user');

const isValidRol = async (role = '') => { 
  const roleExist = await Role.findOne( { role } );
  if(!roleExist) {
    throw new Error(`Role ${role} doesnt exist`);
  }
}

const isEmailExist = async (email) =>  {
  const isEmailExist = await User.findOne({email});

    if( isEmailExist ) { 
        throw new Error('email already in use');   
    } 
}

const isUserExist = async( id ) => {
  const userExist = await User.findById(id);
  if( !userExist ) {
    throw new Error('User doesnt exist');
  }
}

module.exports = { 
  isValidRol,
  isEmailExist,
  isUserExist,
}