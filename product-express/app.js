const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger = require('morgan');
const indexRouter = require('./routes/index');
const productRouter = require('./routes/products');

if (process.env.NAME !== 'auth-express') {
  process.exit(1);
}

console.log('ENV:name:', process.env.NAME);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_SRV);

app.use('/', indexRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;
