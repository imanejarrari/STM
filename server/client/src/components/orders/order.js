import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './order.css';



const Ordr = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch orders from the backend
   const fetchOrder= async () => {
    try{
      const response = await fetch('http://localhost:5000/api/order');
      const data = await response.json();
      setOrders(data);

    }catch(error){
      console.error('Error fetching orders:', error);

    }
   };
    fetchOrder();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
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
        {orders.map((order) => (
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

export default Ordr;
