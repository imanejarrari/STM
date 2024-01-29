const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');
const Product = require('../../models/Product');

// API endpoint for fetching dashboard data
router.get('/dashboardData', async (req, res) => {
  try {
    // Fetch data for the dashboard
    const earnings = await calculateEarnings();
    const sales = await calculateSales();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await getTotalCustomers();
    const stockGraphData = await getStockGraphData();
    const latestOrders = await Order.find().sort({ date: -1 }).limit(5);
    const latestCustomers = await getLatestCustomers ();
       // Log the data being sent in the response
       console.log('Sending response:', {
        earnings,
        sales,
        totalOrders,
        totalCustomers,
        stockGraphData,
        latestOrders,
        latestCustomers,
      });
  
      // Return the dashboard data as a JSON response
      res.json({
        earnings,
        sales,
        totalOrders,
        totalCustomers,
        stockGraphData,
        latestOrders,
        latestCustomers,
      });

    // Return the dashboard data as a JSON response
    res.json({
      earnings,
      sales,
      totalOrders,
      totalCustomers,
      stockGraphData,
      latestOrders,
      latestCustomers,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});
// Function to get the total number of unique customers
async function getTotalCustomers() {
    try {
      // Aggregate to get distinct customer names
      const uniqueCustomerNames = await Order.aggregate([
        { $group: { _id: '$customerName' } },
        { $count: 'totalCustomers' }
      ]);
  
      // Extract the count from the result
      const totalCustomers = uniqueCustomerNames.length > 0 ? uniqueCustomerNames[0].totalCustomers : 0;
  
      return totalCustomers;
    } catch (error) {
      console.error('Error fetching total customers:', error);
      throw error;
    }
  }
  

// Function to get data for the latest customers
async function getLatestCustomers() {
    try {
      // Fetch data from the Order model (adjust fields based on your schema)
      const latestCustomers = await Order.find({}, 'customerName').sort({ date: -1 }).limit(5);
  
      return latestCustomers;
    } catch (error) {
      console.error('Error fetching latest customers:', error);
      throw error;
    }
  }

// Function to calculate earnings
async function calculateEarnings() {
    try {
      // Use Mongoose aggregation to calculate total earnings
      const totalEarningsResult = await Order.aggregate([
        {
          $match: {
            Status: 'Delivered', // Consider only delivered orders
          },
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: '$totalPrice' },
          },
        },
      ]);
  
      // Extract the total earnings from the aggregation result
      const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;
  
      return totalEarnings;
    } catch (error) {
      console.error('Error calculating earnings:', error);
      throw error;
    }
  }
  

// Function to calculate sales
async function calculateSales() {
    try {
      // Use Mongoose aggregation to calculate total sales
      const totalSalesResult = await Order.aggregate([
        {
          $unwind: '$products', // Split products array into separate documents
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$products.quantity' },
          },
        },
      ]);
  
      // Extract the total sales from the aggregation result
      const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;
  
      return totalSales;
    } catch (error) {
      console.error('Error calculating sales:', error);
      throw error;
    }
  }


// Function to get data for the stock graph
async function getStockGraphData() {
    try {
      // Fetch the total quantity in stock for each product
      const products = await Product.find();
      const stockData = products.map((product) => ({
        name: product.name,
        quantityInStock: product.quantityInStock,
      }));
      return stockData;
    } catch (error) {
      console.error('Error fetching stock graph data:', error);
      throw error;
    }
  }
  
  // API endpoint to get stock graph data
  router.get('/stockGraphData', async (req, res) => {
    try {
      const stockData = await getStockGraphData();
      res.json(stockData);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
