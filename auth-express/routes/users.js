const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({
    message: 'User',
  });
});
router.post('/register', function (req, res, next) {
  return res.status(200).json({
    message: 'Register successfully',
  });
});

router.post('/login', function (req, res, next) {
  return res.status(200).json({
    message: 'token',
  });
});

module.exports = router;
