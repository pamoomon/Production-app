const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');
const Order = require('../models/Order');

// Create Shipment
router.post('/', async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    await shipment.save();
    res.status(201).json(shipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('order');
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;