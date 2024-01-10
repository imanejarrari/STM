import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './order.css';



const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend
    fetch('http://localhost:5000/api/orders/order')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h2>Order Table</h2>
      <table className="table">
      <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {Order.map((order) => (
            <tr key={order._id}>
              <td>{order.Name}</td>
              <td>{order.Email}</td>
              <td>${order.Total}</td>
              <td>{order.Paid}</td>
              <td>{order.Status}</td>
              <td>*</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
