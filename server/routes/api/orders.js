const express = require('express');
const router = express.Router();
const Order = require('../../models/Order'); 
const Product = require('../../models/Product');

// API endpoint for fetching orders by customer name
router.get('/customerOrders/:customerName', async (req, res) => {
  const { customerName } = req.params;

  try {
    const customerOrders = await Order.find({ customerName });

    console.log(`Fetched orders for ${customerName}:`, customerOrders);
    
    res.json(customerOrders);
  } catch (error) {
    console.error(`Error fetching orders for ${customerName}:`, error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// API endpoint for placing an order
router.post('/placeOrder', async (req, res) => {
  const { customerName, products } = req.body;

  try {
    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId);

      if (!product || product.quantityInStock < quantity) {
        return res.status(400).json({ error: `Not enough stock for product: ${product ? product.name : 'unknown'}` });
      }

      product.quantityInStock -= quantity;
      await product.save();
    }

    const totalPrice = await calculateTotalPrice(products);

    const order = new Order({ customerName, products, totalPrice });
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// Function to calculate the total price of products in an order
async function calculateTotalPrice(products) {
  const productIds = products.map(product => product.productId);
  const productPrices = await Product.find({ _id: { $in: productIds } }, { _id: 1, price: 1 });

  const totalPrice = products.reduce((acc, { productId, quantity }) => {
    const product = productPrices.find(product => product._id.equals(productId));
    return product ? acc + product.price * quantity : acc;
  }, 0);

  return totalPrice;
}

module.exports = router;
