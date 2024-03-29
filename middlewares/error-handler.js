const { Error } = require('mongoose');

function logErrors(err, req, res, next) { 

  console.log('log errors');
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next){ 
  console.log('errorHandler function');

  if(res.headersSent){
    return next(err);
  }

  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) { 
  if(err.isBoom) {
    console.log('its a boom error');
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

function ormErrorHandler(err, req, res, next) {

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