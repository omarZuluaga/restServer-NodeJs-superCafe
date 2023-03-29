
const { Router } = require('express');
const { check } = require('express-validator');
const  Role  = require('../models/role');

const { validateFields } = require('../middlewares/field-validation');
const {
  isValidRol,
  isEmailExist,
  isUserExist,
} = require("../helpers/db-validators");
const jwtValidator = require('../middlewares/jwt-validator');
const isAdminRole = require('../middlewares/role-validator');
const { createUserSchema, getUserSchema } = require('../schemas/user.schema');
const UserService = require('../service/user.service');

const userService = new UserService();

const router = Router();


router.get('/',
  async (req, res, next) => {
    const {limit , offset } = req.query;
    //const query = { state: true }

    try {
        const users = await userService.findAll();
        res.json({
            users,
        });
        
    } catch (error) {
        next(error);
    }
  });

  router.get('/:id',
    validateFields(getUserSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;

      try {
          const user = await userService.findById(id);
          res.json({
              user,
          });
      } catch (error) {
          next(error);
      }
  });

router.put('/:id',
  validateFields(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userUpdated = await userService.update(id, req.body);
      
      res.json({
          userUpdated
      });
  } catch (error) {
      next(error);
  }

  });

router.post('/', 
  validateFields(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      res.json({
          msg: 'post API - usuariosPost',
          user
      });

  } catch (error) {
      next(error);
  }
  } );

router.delete('/:id', 
  jwtValidator,
  isAdminRole,
  validateFields(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.delete(id);

      res.json(user);
  } catch (error) {
      next(error);
  }
  });





module.exports = router;