import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./supplier.css";



const supplier = () => {
    const [Suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      // Fetch orders from the backend
     const fetchSupplier= async () => {
      try{
        const response = await fetch('http://localhost:5000/api/order');
        const data = await response.json();
        setSuppliers(data);
  
      }catch(error){
        console.error('Error fetching Supplier:', error);
  
      }
     };
      fetchSupplier();
    }, []);

}