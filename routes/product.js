const { Router } = require("express");
const { validateFields } = require('../middlewares/field-validation');
const jwtValidator = require('../middlewares/jwt-validator');
const { getProductById, createProduct } = require("../schemas/product.schema");

const ProductService = require('../service/product.service');

const productService = new ProductService();
const router = Router();


router.get('/',
  async(req, res, next) => { 
    const {page = 1, limit = 10 } = req.query;
    const skipIndex = (page - 1) * limit;

    try {
      const products = await productService.findProduct(limit, skipIndex);

      res.status(200).json({
        products
      })
    } catch (error) {
      next(error);
    }
  });

router.get('/:id',
  validateFields(getProductById, 'params'),
  async(req, res, next) => { 
    const { id } = req.params;
    try {
      const product = await productService.findProductById(id);

      res.status(200).json({
        product
      });
      
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validateFields(createProduct, 'body'),
  async(req, res, next) => {

    const { body } = req.body;
    try {
      const productCreated = await productService.createProduct(body);
      
      res.status(201).json({
        productCreated
      })
    } catch (error) {
      next(error);
    }
  });