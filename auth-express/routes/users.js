const express = require('express');
const argon2 = require('argon2');

const User = require('../models/user');

const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({
    message: 'User',
  });
});

router.get('/profile', function (req, res, next) {
  return res.status(200).json({
    message: {
      name: 'Monkey',
      email: 'monkey@gmail.com',
    },
  });
});

router.post('/register', async function (req, res, next) {
  console.log('🟨', req.body);
  const { fullName, email, password } = req.body;

  const hash = await argon2.hash(password);

  try {
    const newUser = await User.create({
      full_name: fullName,
      email: email,
      password: hash,
    });
    return res.status(200).json({
      message: 'Register successfully',
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
      },
    });
  } catch (e) {
    if (e?.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'This Email is already used.',
      });
    }
    return res.status(500).json({
      message: 'Failure',
      error: e,
    });
  }
});

router.post('/login', function (req, res, next) {
  return res.status(200).json({
    message: 'token',
  });
});

module.exports = router;
