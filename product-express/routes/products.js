const express = require('express');
const passportJWT = require('../middlewares/passport-jwt');

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

module.exports = router;
