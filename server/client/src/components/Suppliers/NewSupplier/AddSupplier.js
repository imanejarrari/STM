import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AddSupplier() {
  const [formData, setFormData] = useState({
    Supplier_Name: '',
    phone: '',
    Email: '',
    address: '',
    date: '',
    
  });

  const [Supplier_Name, setSupplier_Name] = useState([]);
  const [phone, setphone] = useState([]);
  const [Email, setEmail] = useState([]);
  const [address, setAddress] = useState([]);
  const [date, setdate] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Suppliers');
        const FromServer = response.data; 
        setSupplier_Name(FromServer.map(Obj => Obj.Supplier_Name));
        setphone(FromServer.map(Obj => Obj.phone));
        setEmail(FromServer.map(Obj => Obj.Email));
        setAddress(FromServer.map(Obj => Obj.address));
        setdate(FromServer.map(Obj => Obj.date));
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };
    fetchSupplier();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit triggered');

    try {
      const response = await axios.post('http://localhost:5000/api/Suppliers/newSupplier/AddSupplier', formData, {
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
    date: '',
      });
      setValidationErrors({});
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.validationErrors) {
        setValidationErrors(error.response.data.validationErrors);
      } else {
        console.error('Error:', error);
      }
    }
  };
return(
 
  <div className="container mt-4">
  <h2 className='mb-4'>
    Add New Supplier
  </h2>
  <form onSubmit={handleSubmit} method="POST" className="row g-3">
    <div className="col-md-6 mb-3">
      <label className="form-label">Supplier:</label>
      <input
        type="text"
        className="form-control"
        name="Supplier_Name"
        value={formData.Supplier_Name}
        onChange={handleChange}
        required
      />
      {validationErrors.Supplier_Name && <div className="text-danger">{validationErrors.Supplier_Name}</div>}
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label">Phone:</label>
      <input
        type="text"
        className="form-control"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
       
      />
     
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label"  >Email:</label>
      <input
        type="text"
        className="form-control"
        placeholder="example@gmail.com"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        
      />
      {validationErrors.Email && <div className="text-danger">{validationErrors.Email}</div>}
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label">Address:</label>
      <input
        type="text"
        className="form-control"
        name="address"
        value={formData.address}
        onChange={handleChange}
        
      />
     
      {validationErrors.address && <div className="text-danger">{validationErrors.address}</div>}
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label" >Date:</label>
      <input
        type="text"
        className="form-control"
        name="date"
        value={formData.date}
        onChange={handleChange}
        
      />
      {validationErrors.date && <div className="text-danger">{validationErrors.date}</div>}
    </div>
    
    <div className="col-md-6 mb-3 d-flex justify-content-center">
    <button type="submit" id="add-supplier">
  <FontAwesomeIcon icon={faSquarePlus} style={{ marginRight: '28px' }} /> Add Supplier
</button>

    </div>
  </form>
</div>

);

};  

export default AddSupplier;