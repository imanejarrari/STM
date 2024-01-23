import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('An error occurred while fetching orders. Please try again.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
<Link to={"/NewOrder"}>Add order</Link>
      <h2>All Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Postal Code</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Delivery Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customerName}</td>
                <td>{order.customerAddress}</td>
                <td>{order.CodePostal}</td>
                <td>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.productId}>
                        {product.quantityInStock} x {product.Name || `Product ID: ${product.productId}`}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalPrice}</td>
                <td>{new Date(order.delivereyDate).toLocaleDateString()}</td>
                <td>{order.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersList;
