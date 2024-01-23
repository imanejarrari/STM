const express = require('express');
const router = express.Router();
const Order = require('../../models/Order'); 
const Product = require("../../models/Product");



router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    console.log('Fetched orders:', orders); 
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// API endpoint for placing an order
router.post('/placeOrder', async (req, res) => {
  const { customerName, products } = req.body;

  try {
   

    // Update product quantities
    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId);

      // Check if enough quantity is available
      if (!product || product.quantityInStock < quantity) {
        return res.status(400).json({ error: `Not enough stock for product: ${product ? product.name : 'unknown'}` });
      }

      // Update product quantity
      product.quantityInStock -= quantity;
      await product.save();
    }

    // Calculate total price and create the order
    const totalPrice = await calculateTotalPrice(products);
    const order = new Order({ customerName, products, totalPrice });
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Helper function to calculate total price
const calculateTotalPrice = async (products) => {
  return products.reduce(async (totalPromise, { productId, quantity }) => {
    const total = await totalPromise;

    // Fetch the product price from the database
    const product = await Product.findById(productId);

    return total + product.sellingPrice * quantity;
  }, Promise.resolve(0));
};


module.exports = router;