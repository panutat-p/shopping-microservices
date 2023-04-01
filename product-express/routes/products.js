const express = require('express');

const passportJWT = require('../middlewares/passport-jwt');
const checkAdmin = require('../middlewares/check-admin');
const Product = require('../models/product');

const router = express.Router();

router.get('/', [passportJWT.isLogin], async function (req, res, next) {
  console.log('/api/v1/products');
  try {
    return res.status(200).json({
      products: [{ name: 'apple' }, { name: 'banana' }, { name: 'carrot' }],
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Failure',
      error: e,
    });
  }
});

router.post('/add', [passportJWT.isLogin, checkAdmin.checkAdminRole], async function (req, res, next) {
  console.log('/api/v1/products/add');
  try {
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      message: 'Add product successfully',
      product: newProduct,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({
        message: 'This product_id already exists',
        product_id: req.body.product_id,
      });
    }
    return res.status(500).json({
      message: 'Failure',
      error: e,
    });
  }
});

module.exports = router;
