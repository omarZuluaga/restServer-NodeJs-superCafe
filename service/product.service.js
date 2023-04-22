const Product = require('../models/product');
const boom = require('@hapi/boom');

class ProductService {

  constructor() {}

  async findProduct(limit, skipIndex) {
    const products = await Product.find()
      .skip(skipIndex)
      .populate('category');

    return products;
  }

  async findProductById(id) {
    const product = await Product.findOne(id)
      .populate('category');

    if(!product) {
      throw boom.notFound('product not found');
    }

    return product;
  }

  async createProduct(product) {
    const productSaved = await Product.create(product);

    return productSaved;
  }

  async updateProduct(id, product) {
   const productUpdate = await Product.findOneAndUpdate(id, product, {new: true});

    return productUpdate;
  }

  async deleteProduct(id) { 
    const productInactive = await Product.findOneAndUpdate(id, {state: false}, {new: true});

    return productInactive;
  }
}

module.exports = ProductService;