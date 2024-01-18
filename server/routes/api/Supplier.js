const express = require("express");
const router = express.Router();
const Supplier = require("../../models/supplier");
const validateNewSupplierInput = require("../../validation/supplierValidation");

// GET all suppliers
router.get("/", async (req, res) => {
  try {
    const allSuppliers = await Supplier.find();
    res.json(allSuppliers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new supplier
router.post("/newSupplier", async (req, res) => {
  const { errors, isValid } = validateNewSupplierInput(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'Validation Error', validationErrors: errors });
  }

  try {
    const newSupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.json(savedSupplier);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = router;
