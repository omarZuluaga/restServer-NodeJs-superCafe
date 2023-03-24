const { Error } = require('mongoose');

const logErrors = (err, req, res, next) => { 

  console.log('log errors');
  console.error(err);
  next(err);
}

const errorHandler = (err, req, res, next) => { 

  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

const boomErrorHandler = (err, req, res, next) => { 

  if(err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

const ormErrorHandler = (err, req, res, next) => {

  if(err instanceof Error.ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }

  next(err);
}

module.exports = { 
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
}