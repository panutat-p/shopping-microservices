const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const passportJWT = require('../middlewares/passport-jwt');

const User = require('../models/user');

const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({
    message: 'User',
  });
});

router.get('/profile', [passportJWT.isLogin], async function (req, res, next) {
  try {
    const user = await User.findByPk(req.user.user_id);
    return res.status(200).json({
      profile: {
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Failure',
      error: e,
    });
  }
});

router.post('/register', async function (req, res, next) {
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

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ where: { email: email } });
    if (user === null) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Failure',
      error: e,
    });
  }

  try {
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Failure',
      error: e,
    });
  }

  return res.status(200).json({
    message: 'Authorized',
    access_token: jwt.sign({ user_id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' }),
  });
});

module.exports = router;
