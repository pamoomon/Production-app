const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create Order
router.post('/', async (req, res) => {
  try {
    const { productCode, ...orderData } = req.body;
    const product = await Product.findOne({ productCode });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const order = new Order({
      ...orderData,
      product: product._id
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;