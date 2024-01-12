const express = require("express");
const router = express.Router();
const Order = require("../../models/supplier");

// Define routes for fetching orders
router.get('/supllier', async (req, res) => {
  try {
    const Supllier = await Suppliers.find();
    res.json(Supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
