const express = require("express");
const router = express.Router();

const Supplier = require("../../models/supplier");
const validateNewSupplierInput = require("../../validation/supplierValidation");

// GET all suppliers
router.get("/suppliers", (req, res) => {
  Supplier.find()
    .then((suppliers) => res.json(suppliers))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

// POST a new supplier
router.post("/newsupplier", (req, res) => {
  const { errors, isValid } = validateNewSupplierInput(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'Validation Error', validationErrors: errors });
  }

  const newSupplier = new Supplier(req.body);

  newSupplier
    .save()
    .then((supplier) => res.json(supplier))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: 'Bad Request' });
    });
});

module.exports = router;
