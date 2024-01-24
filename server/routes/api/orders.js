const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');
const Product = require('../../models/Product');



// API endpoint for fetching all orders
router.get('/allOrders', async (req, res) => {
  try {
    // Fetch all orders from the database
    const allOrders = await Order.find();

    // Calculate total quantity for each order
    const ordersWithTotalQuantity = allOrders.map(order => {
      const totalQuantity = order.products.reduce((acc, product) => acc + product.quantity, 0);
      return { ...order.toObject(), totalQuantity };
    });

    // Return the orders with total quantity as a JSON response
    res.json(ordersWithTotalQuantity);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});


// API endpoint for fetching products by order
router.get('/orderProducts/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order based on the provided order ID
    const order = await Order.findById(orderId);

    // If the order is not found, return an error
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Extract the product IDs from the order
    const productIds = order.products.map(product => product.productId);

    // Fetch the product details based on the product IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Return the products as a JSON response
    res.json({ products });
  } catch (error) {
    console.error(`Error fetching products for order ${orderId}:`, error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// API endpoint for placing an order
router.post('/placeOrder', async (req, res) => {
  const { customerName, customerAddress, codePostal, delivereyDate, products } = req.body;

  try {
    // Check if required fields are missing or empty
    if (!customerName || !customerAddress || !codePostal || !delivereyDate || !products || products.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid order data.' });
    }

    // Calculate total price
    const totalPrice = await calculateTotalPrice(products);

    // Validate deliveryDate, customerAddress, and codePostal
    if (!delivereyDate || !customerAddress || !codePostal) {
      return res.status(400).json({ error: 'Delivery date, customer address, and code postal are required fields.' });
    }

    // Validate and update product quantities in stock
    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: `Product with ID ${productId} not found.` });
      }

      if (quantity > product.quantityInStock) {
        return res.status(400).json({ error: `Not enough stock for product ${productId}. Available stock: ${product.quantityInStock}` });
      }

      // Update the quantity in stock
      product.quantityInStock -= quantity;

      // Save the updated product
      await product.save();
    }

    const order = new Order({ customerName, customerAddress, codePostal, delivereyDate, products, totalPrice });
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error placing order:', error);

    if (error.name === 'ValidationError') {
      // Handle validation error
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: `Validation Error: ${validationErrors.join(', ')}` });
    }

    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});


// Function to calculate the total price of products in an order
async function calculateTotalPrice(products) {
  const productIds = products.map(product => product.productId);
  const productPrices = await Product.find({ _id: { $in: productIds } }, { _id: 1, sellingPrice: 1 });

  const totalPrice = products.reduce((acc, { productId, quantity }) => {
    const product = productPrices.find(product => product._id.equals(productId));
    return product ? acc + (product.sellingPrice * quantity) : acc;
  }, 0);

  return totalPrice;
  
}





module.exports = router;
