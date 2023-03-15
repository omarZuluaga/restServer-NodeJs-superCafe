
const isAdminRole = ( req, res, next ) => {

  try {
    if( !req.user ) { 
      return res.status(500).json({
        message: 'cant verify the token without validate role first'
      });
    }
  
    const { role, username } = req.user;
  
    if( role !== 'ADMIN' ){ 

      const statusError = res.json({
        type: 'error',
        httpCode: 400,
        message:  {
          errCode: 'e402',
          message: `${username} is not an admin`,
        }
      });

      next(statusError);
    };
    
    console.log('voy a ejecutar el next');
    next();
  } catch (error) {
    console.log("🚀 ~ file: role-validator.js:21 ~ isAdminRole ~ error:", error);
    
  }
}

module.exports = isAdminRole;