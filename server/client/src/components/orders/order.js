import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './order.css';



const Ordr = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState({ value: 'za', label: <i className="fas fa-sort-alpha-up-alt"></i> });
  const [checkboxVisible, setCheckboxVisible] = useState(false);

  useEffect(() => {
    // Fetch orders from the backend
   const fetchOrder= async () => {
    try{
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      setOrders(data);

    }catch(error){
      console.error('Error fetching orders:', error);

    }
   };
    fetchOrder();
  }, []);

  return (
    <div className="container mt-4">
        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 ml-5 " style={{ marginRight: "250px", marginLeft: "250px" }}>
          <div className="input-group">
            <input
              type="search"
              placeholder="What're you searching for?"
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
        <div className="row" style={{ marginTop: "10px" }}>
        
        <h2>Orders</h2>
      <table className="table">
      <thead>
          <tr>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Paid</th>
            <th>deliverey Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.suppliers.Supplier_Name}</td>
              <td>{order.Quantity}</td>
              <td>{order.Total}$</td>
              <td>{order.deliveryDate}</td>
              <td>{order.Status}</td>
              <td>*</td>
            </tr>
          ))}
        </tbody>
      </table>
          
        </div>
      </div>
    
  );
};

export default Ordr;
