import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import "./supplier.css";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 
  
 

  useEffect(() => {
    // Fetch suppliers from the backend
    const fetchSupplier = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching Supplier:', error);
      }
    };
    fetchSupplier();
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
    
    </div>
      <table className="table" border={1}>
      <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Registration date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {suppliers.map((suppliers) => (
            <tr key={suppliers._id}>
              <td>{suppliers.Supplier_Name}</td>
              <td>{suppliers.Email}</td>
              <td>{suppliers.phone}</td>
              <td>{suppliers.address}</td>
              <td>{suppliers.date}</td>
              <td>*</td>
              
            </tr>
          ))}
        </tbody>
      </table>
          



    </div>
  );
};

export default Supplier;
