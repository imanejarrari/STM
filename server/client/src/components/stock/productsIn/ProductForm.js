import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./StockPage.css";

function NewProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    supplierName: '',
    supplierContactInfo: '',
    supplierAddress:'',
    costPrice: '',
    sellingPrice: '',
    quantityInStock: '',
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersInfo, setSuppliersInfo] = useState([]);
  const [supplierAddress, setSuppliersAddress] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/productlist');
        const FromServer = response.data; 
        setCategories(FromServer.map(Obj => Obj.category));
        setBrands(FromServer.map(Obj => Obj.brand));
        setSuppliers(FromServer.map(Obj => Obj.supplierName));
        setSuppliersInfo(FromServer.map(Obj => Obj.supplierContactInfo));
        setSuppliersAddress(FromServer.map(Obj => Obj.supplierAddress));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/products/newproduct', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('New Product Response:', response.data);

      setFormData({
        name: '',
        description: '',
        category: '',
        brand: '',
        supplierName: '',
        supplierContactInfo: '',
        supplierAddress:'',
        costPrice: '',
        sellingPrice: '',
        quantityInStock: '',
      });
      // Redirect to a Product page after successful submission
      navigate('/productlist');
      setValidationErrors({});
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.validationErrors) {
        setValidationErrors(error.response.data.validationErrors);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} method="POST" className="row g-3">
          <h3>Add New Product</h3>
        <div className="col-md-6 mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {validationErrors.name && <div className="text-danger">{validationErrors.name}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Category:</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            list="categoryList"
          />
          <datalist id="categoryList">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Brand:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brand..."
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            list="brandList"
          />
          <datalist id="brandList">
            {brands.map((brand) => (
              <option key={brand} value={brand} />
            ))}
          </datalist>
          {validationErrors.brand && <div className="text-danger">{validationErrors.brand}</div>}
        </div>
        <div className="col-md-6 mb-3" style={{height:"1em"}}>
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {validationErrors.description && <div className="text-danger">{validationErrors.description}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Supplier Name:</label>
          <input
            type="text"
            className="form-control"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            list="supplierList"
          />
          <datalist id="supplierList">
            {suppliers.map((supplierName) => (
              <option key={supplierName} value={supplierName} />
            ))}
          </datalist>
          {validationErrors.supplierName && <div className="text-danger">{validationErrors.supplierName}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Supplier Contact Info:</label>
          <input
            type="text"
            className="form-control"
            name="supplierContactInfo"
            value={formData.supplierContactInfo}
            onChange={handleChange}
            list="supplierInfoList"
          />
          <datalist id="supplierInfoList">
            {suppliersInfo.map((supplierInfo) => (
              <option key={supplierInfo} value={supplierInfo} />
            ))}
          </datalist>
          {validationErrors.supplierContactInfo && (
            <div className="text-danger">{validationErrors.supplierContactInfo}</div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Supplier Address:</label>
          <input
            type="text"
            className="form-control"
            name="supplierAddress"
            value={formData.supplierAddress}
            onChange={handleChange}
            list="supplierAddressList"
          />
          <datalist id="supplierAddressList">
            {suppliersInfo.map((supplierAddress) => (
              <option key={supplierAddress} value={supplierAddress} />
            ))}
          </datalist>
          {validationErrors.supplierAddress && (
            <div className="text-danger">{validationErrors.supplierAddress}</div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Cost Price:</label>
          <input
            type="number"
            className="form-control"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            required
          />
          {validationErrors.costPrice && <div className="text-danger">{validationErrors.costPrice}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Selling Price:</label>
          <input
            type="number"
            className="form-control"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
          />
          {validationErrors.sellingPrice && <div className="text-danger">{validationErrors.sellingPrice}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Quantity in Stock:</label>
          <input
            type="number"
            className="form-control"
            name="quantityInStock"
            value={formData.quantityInStock}
            onChange={handleChange}
            required
          />
          {validationErrors.quantityInStock && (
            <div className="text-danger">{validationErrors.quantityInStock}</div>
          )}
        </div>
        <div className="col-md-6 mb-3 d-flex justify-content-center">
          <button type="submit"  id='add-product'>
            <FontAwesomeIcon icon={faSquarePlus} style={{marginRight:'28px'}} />Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProductForm;
