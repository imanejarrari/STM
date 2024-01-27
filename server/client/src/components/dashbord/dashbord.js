import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/dashboardData');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Display other dashboard data */}
      <div>
        <h2>Total Earnings: ${dashboardData.earnings}</h2>
        <h2>Total Sales: {dashboardData.sales}</h2>
        <h2>Total Orders: {dashboardData.totalOrders}</h2>
        <h2>Total Customers: {dashboardData.totalCustomers}</h2>
      </div>

      <div>
  <h2>Stock Level:</h2>
  {console.log('Stock Graph Data:', dashboardData.stockGraphData)}
  <Bar
    data={{
      labels: dashboardData.stockGraphData ? dashboardData.stockGraphData.map((data) => data.name) : [],
      datasets: [
        {
          label: 'Quantity in Stock',
          data: dashboardData.stockGraphData ? dashboardData.stockGraphData.map((data) => data.quantityInStock) : [],
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    }}
    height={400}
    width={600}
    options={{
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }}
  />
</div>

      {/* Display latest orders */}
      <div>
        <h2>Latest Orders:</h2>
        <ul>
          {dashboardData.latestOrders &&
            dashboardData.latestOrders.map((order) => (
              <li key={order._id}>{order.customerName} - ${order.totalPrice}</li>
            ))}
        </ul>
      </div>

      {/* Display latest customers */}
      <div>
        <h2>Latest Customers:</h2>
        <ul>
          {dashboardData.latestCustomers &&
            dashboardData.latestCustomers.map((customer, index) => (
              <li key={index}>{customer.customerName}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
