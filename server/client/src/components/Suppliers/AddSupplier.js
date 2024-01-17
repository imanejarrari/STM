import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const AddSupplier = () => {

    const [formData, setFormData] = useState({
      Supplier_Name: '',
      Email: '',
      phone: '',
      address: '',
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Send a POST request to your backend endpoint
        const response = await axios.post('http://localhost:5000/api/suppliers/AddSupplier', formData);
  
        // Handle the response as needed (e.g., show a success message)
        console.log('New supplier added:', response.data);
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error adding supplier:', error.message);
      }
    };
return(
 
<div></div>

);

};  

export default AddSupplier;