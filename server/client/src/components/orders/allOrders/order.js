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
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);



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


// Function to check if the delivery date is the current day or in the past
const isDeliveryDelivered = (deliveryDate) => {
  const formattedToday = new Date().toISOString().split('T')[0];
  return formattedToday >= deliveryDate.split('T')[0];
};

// Update the status automatically based on delivery date
const updateStatusBasedOnDeliveryDate = (order) => {
  if (isDeliveryDelivered(order.delivereyDate)) {
    // If delivery date is today or in the past, update the status to 'Delivered'
    order.Status = 'Delivered';
  }
};


useEffect(() => {
  // Function to filter orders based on status and date range
  const filterOrders = () => {
    let filtered = allOrders;

    // Filter by customer name
    filtered = filtered.filter((order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by status
    if (selectedStatus !== 'All') {
      filtered = filtered.filter((order) => order.Status === selectedStatus);
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.delivereyDate).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(filtered);
  };

  filterOrders();
}, [allOrders, searchTerm, selectedStatus, startDate, endDate]);

const handleViewDetails = (orderId) => {
  // You can navigate to the new page using the Link component
  // You can replace '/order-details' with the actual path of your order details page
  // and pass the orderId as a parameter
  setSelectedOrder(orderId);
};
 

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
    <div className='huh'>
       <div className="range">
        <label htmlFor="startDate"></label>
        <input
        style={{paddingLeft:'30px' , marginRight:'5px'}}
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate"> To</label>
        <input
        style={{paddingLeft:'30px' , marginLeft:'5px'}}
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

  <div className='filter'>

        <label htmlFor="statusFilter" className="form-label"> Filter by Status:</label>
        <select
          id="statusFilter"
          className="form-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Delivered">Delivered</option>
          <option value="Not Delivered">Not Delivered</option>
         
        </select>
      </div>
    </div>
    

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
                <td>{order.totalQuantity}</td>
                <td>${order.totalPrice}</td>
                <td >
                  <div className='stt' style={{ backgroundColor: order.Status === 'Delivered' ? 'greenyellow' : 'red' , paddingLeft: order.Status === 'Delivered' ? '30px' : '20px' }} >
                     {order.Status}
                  </div>
                 
                </td>
                <td> <button className='Eye'>
                <Link to={`/orderDetails/${order._id}`}
                   onClick={() => handleViewDetails(order._id)}
                >
                    <FaEye />
                  </Link>

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