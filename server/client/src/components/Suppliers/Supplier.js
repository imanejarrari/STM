import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./supplier.css";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching Supplier:', error);
      }
    };
    fetchSupplier();
  }, []);

  // Filter suppliers based on the search term
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.Supplier_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* Your other components or elements */}
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
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.Supplier_Name}</td>
              <td>{supplier.Email}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.address}</td>
              <td>{supplier.date}</td>
              <td>*</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Supplier;
