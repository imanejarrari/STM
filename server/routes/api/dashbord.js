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
    const latestSupplier = await getLatestSupplier();
    const salesPerCategory = await getSalesPerCategory(); 
    
    // Log the data being sent in the response
    console.log('Sending response:', {
      earnings,
      sales,
      totalOrders,
      totalCustomers,
      stockGraphData,
      latestOrders,
      latestSupplier,
      salesPerCategory, 
    });

    // Return the dashboard data as a JSON response
    res.json({
      earnings,
      sales,
      totalOrders,
      totalCustomers,
      stockGraphData,
      latestOrders,
      latestSupplier,
      salesPerCategory, 
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
async function getLatestSupplier() {
  try {
    // Fetch data from the Product model (adjust fields based on your schema)
    const latestSupplier = await Product.find({}, 'supplierName supplierContactInfo').sort({ date: -1 }).limit(5);

    return latestSupplier;
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
          Status:'Delivered',
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
//function to calculate total sales :
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
      category: product.category,
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

// API endpoint to get orders per week
router.get('/ordersPerWeek', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const ordersData = await getOrdersPerWeek(startDate, endDate);
    res.json(ordersData);
  } catch (error) {
    console.error('Error fetching orders per week:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Add a new API endpoint to get total quantity of products for each supplier
router.get('/totalProductsPerSupplier', async (req, res) => {
  try {
    const totalProductsPerSupplier = await getTotalProductsPerSupplier();
    res.json(totalProductsPerSupplier);
  } catch (error) {
    console.error('Error fetching total products per supplier:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to get total quantity of products for each supplier
async function getTotalProductsPerSupplier() {
  try {
    // Use Mongoose aggregation to calculate total quantity of products for each supplier
    const totalProductsPerSupplierResult = await Product.aggregate([
      {
        $group: {
          _id: '$supplierName',
          totalQuantity: { $sum: '$quantityInStock' },
        },
      },
    ]);

    return totalProductsPerSupplierResult;
  } catch (error) {
    console.error('Error calculating total products per supplier:', error);
    throw error;
  }
}

// Function to get sales data for each product category
async function getSalesPerCategory() {
  try {
    const salesPerCategoryResult = await Order.aggregate([
      {
        $unwind: '$products',
      },
      {
        $group: {
          _id: '$products.category',
          totalSales: { $sum: '$products.quantity' },
        },
      },
    ]);

    return salesPerCategoryResult.map(({ _id, totalSales }) => ({
      category: _id,
      totalSales,
    }));
  } catch (error) {
    console.error('Error calculating sales per category:', error);
    throw error;
  }
}

// API endpoint to get sales data for each product category
router.get('/salesPerCategory', async (req, res) => {
  try {
    const salesPerCategoryData = await getSalesPerCategory();
    res.json(salesPerCategoryData);
  } catch (error) {
    console.error('Error calculating sales per category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
