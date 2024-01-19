import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewSupplier.css';


const AddSupplier = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    Supplier_Name: '',
    phone: '',
    Email: '',
    address: '',
    
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.Supplier_Name.trim()) {
      errors.Supplier_Name = 'Supplier Name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    }

    // Add more validations for other fields as needed

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/Suppliers/newSupplier', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('New supplier Response:', response.data);

      setFormData({
        Supplier_Name: '',
        phone: '',
        Email: '',
        address: '',
        
      });

      // Redirect to a different page after successful submission
      navigate('/Suppliers');

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error) {
        // Handle server-side validation errors
        setValidationErrors({ serverError: error.response.data.error });
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='form'>
      <h4>Add New Supplier</h4>
      {validationErrors.serverError && (
        <div style={{ color: 'red' }}>{validationErrors.serverError}</div>
      )}
      <form onSubmit={handleSubmit} > 
      <label>Name:</label>
        <div className='Supplier'>
          <input
            type="text"
            name="Supplier_Name"
            value={formData.Supplier_Name}
            placeholder=' Full Name'
            onChange={handleChange}
            required
          />
          {validationErrors.Supplier_Name && (
            <div style={{ color: 'red' }}>{validationErrors.Supplier_Name}</div>
          )}
        </div>
         <label>Phone:</label>
        <div className='Phone'>
          
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder='00000000'
            onChange={handleChange}
            required
          />
          {validationErrors.phone && (
            <div style={{ color: 'red' }}>{validationErrors.phone}</div>
          )}
        </div>
         <label>Email:</label>
        <div className='email'>
          
          <input
            type="text"
            name="Email"
            value={formData.Email}
            placeholder='Example@gmail.com'
            onChange={handleChange}
            required
          />
          {validationErrors.Email && (
            <div style={{ color: 'red' }}>{validationErrors.Email}</div>
          )}
        </div>
         <label>Address:</label>
        <div className='address'>
          
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder='City-Street-Code Postal-country'
            onChange={handleChange}
            required
          />
          {validationErrors.address && (
            <div style={{ color: 'red' }}>{validationErrors.address}</div>
          )}
        </div>


        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;
