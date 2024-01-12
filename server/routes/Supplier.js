const express = require("express");
const router = express.Router();
const Supplier = require("../../models/supplier");

// Define routes for fetching orders
router.get('/supllier', async (req, res) => {
  try {
    const Suppliers = await Supplier.find();
    res.json(Suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
