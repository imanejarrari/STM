import React, { useState, useEffect } from 'react';

import { FaEye  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './order.css';

const CustomerOrdersList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with your actual API endpoint for fetching all orders
        const response = await fetch('http://localhost:5000/api/orders/allOrders');
        const data = await response.json();

        setAllOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductsByOrder = async (orderId) => {
    try {
      console.log('Fetching products for order with ID:', orderId);
      // Replace the URL with your actual API endpoint for fetching products by order
      const response = await fetch(`http://localhost:5000/api/products/productsByOrder/${orderId}`);
      const data = await response.json();
      console.log('Fetched products:', data);

      // Append the new products to the existing list
      setOrderProducts((prevProducts) => [...prevProducts, ...data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

    // Function to check if the delivery date is the current date
    const isDeliveryToday = (deliveryDate) => {
      const today = new Date();
      const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      return formattedToday === deliveryDate;
    };
  
    // Update the status automatically based on delivery date
    const updateStatusBasedOnDeliveryDate = (order) => {
      if (isDeliveryToday(order.delivereyDate)) {
        // If delivery date is today, update the status
        order.Status = 'Delivered';
      }
  
    };

  const filteredOrders = allOrders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="container mt-4">
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 ml-5 " style={{ marginRight: "250px", marginLeft: "250px" }}>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search by customer name"
            aria-describedby="button-addon1"
            className="form-control border-0 bg-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
          </div>
        </div>
      </div>
      
      <div className='div1'><Link to="/AllOrders"  className='orders'>All Orders</Link></div> 
     <div className='div2'><Link to="/placeOrder" className='add'> New Order</Link></div> 

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              
              <th>Customer Name</th>
              <th>Delivery Date</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredOrders.map((order) => {
            // Update status based on delivery date
            updateStatusBasedOnDeliveryDate(order);

            return (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.delivereyDate}</td>
                <td>{order.totalPrice}</td>
                <td style={{ color: order.Status === 'Delivered' ? 'green' : 'red' }}>
                  {order.Status}
                </td>
                <td> <button className='Eye'>
                  <FaEye />
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      )}

   
    </div>
  );
};

export default CustomerOrdersList;