const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require("../middlewares/error-handler");

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080;
        this.paths = { 
            auth: '/api/auth',
            categoriesPath: '/api/categories',
            userPath: '/api/users',
        }

        //db connection
        this.conectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectDB() { 
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        this.app.use( logErrors );
        this.app.use(ormErrorHandler);
        this.app.use(boomErrorHandler);
        this.app.use(errorHandler)

    }

    routes() {
        this.app.use( this.paths.userPath, require('../routes/user'));
        this.app.use (this.paths.auth, require('../routes/auth'));
        this.app.use (this.paths.categoriesPath, require('../routes/categories'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server runing on port: ', this.port );
        });
    }

}




module.exports = Server;
