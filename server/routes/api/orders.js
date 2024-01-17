const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { supplierId,Quantity,Total,Pais,deliveryDate} = req.body;
    
    const order = new Order({
      supplier: supplierId,
      Quantity:Quantity,
      Total:Total,
      Pais:Pais,
      deliveryDate:deliveryDate,
      
    });

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update order status to "Delivered" when delivery date is reached
const updateOrderStatus = async (orderId) => {
  try {
    const currentDate = new Date();
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: { status: 'Delivered' },
      },
      { new: true } // Returns the updated document
    );

    if (!updatedOrder) {
      console.log('Order not found');
      return;
    }

    console.log(`Order ${orderId} marked as Delivered at ${currentDate}`);
  } catch (err) {
    console.error(`Error updating order status: ${err.message}`);
  }
};

// Simulate checking for upcoming delivery dates and updating status
setInterval(async () => {
  const upcomingOrders = await Order.find({
    deliveryDate: { $lte: new Date() },
    status: 'Not Delivered',
  });

  for (const order of upcomingOrders) {
    await updateOrderStatus(order._id);
  }
}, 24 * 60 * 60 * 1000); // Check every 24 hours


// Get all orders with supplier details
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('supplier');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;