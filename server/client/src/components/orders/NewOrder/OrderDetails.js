// OrderDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/orderDetails/${orderId}`);
        const data = await response.json();
        setOrderDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // Handle error
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Order Details</h2>
          {/* Display order details here using orderDetails state */}
          <p>Customer Name: {orderDetails.customerName}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
