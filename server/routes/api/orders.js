const express = require('express');
const router = express.Router();
const Order = require('../../models/Order'); 
const Product = require("../../models/Product");



// API endpoint for fetching all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    console.log('Fetched all orders:', orders); 
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for fetching orders by customer name
router.get('/customerOrders/:customerName', async (req, res) => {
  const { customerName } = req.params;

  try {
    const customerOrders = await Order.find({ customerName });
    console.log(`Fetched orders for ${customerName}:`, customerOrders);
    res.json(customerOrders);
  } catch (error) {
    console.error(`Error fetching orders for ${customerName}:`, error);
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



module.exports = router;