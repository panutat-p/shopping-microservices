const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
      unique: true,
    },
    product_name: String,
    product_price: { type: mongoose.Types.Decimal128 },
    created_at: { type: Date, default: Date.now() },
  },
  {
    collection: 'products',
    timestamps: false,
  }
);

const Product = mongoose.model('Product', schema);

module.exports = Product;
