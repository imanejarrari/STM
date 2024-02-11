const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");
const validateNewProductInput = require("../../validation/productValidation");

router.get("/productlist", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

router.post("/newproduct", (req, res) => {
  const { errors, isValid } = validateNewProductInput(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'Validation Error', validationErrors: errors });
  }
  const newProduct = new Product(req.body);
  
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: 'Bad Request' });
    });
});

router.post("/deleteproduct", async (req, res) => {
  try {
    const productId = req.body.productId;

    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Error deleting product" });
  }
});

router.put('/updateproduct', async (req, res) => {
  try {
    const { _id, ...updatedFields } = req.body;

    const product = await Product.findById(_id);

    Object.keys(updatedFields).forEach(field => {
      product[field] = updatedFields[field];
    });

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/newproducts', async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const insertedProducts = await Product.insertMany(products);

    res.status(201).json({ message: 'Products added successfully', insertedProducts });
  } catch (error) {
  console.error('Error adding products:', error);
  res.status(500).json({ message: 'Internal Server Error', error: error.message });
}

});

router.get("/productsBySupplier/:supplierName", (req, res) => {
  const supplierName = req.params.supplierName;

  Product.find({ supplierName: supplierName }) 
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});


router.post('/getProductsByIds', async (req, res) => {
  const { productIds } = req.body;

  try {
    if (!Array.isArray(productIds) || !productIds.every(mongoose.Types.ObjectId.isValid)) {
      return res.status(400).json({ error: 'Invalid product IDs.' });
    }

    const products = await Product.find({ _id: { $in: productIds } });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
