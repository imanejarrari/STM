import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePlus, faTag, faCubes, faMoneyBill, faLayerGroup, faMoneyBillAlt, faBuilding, faUser, faMailForward, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "./StockPage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    supplierName: '',
    supplierContactInfo: '',
    costPrice: '',
    sellingPrice: '',
    quantityInStock: '',
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersInfo, setSuppliersInfo] = useState([]);

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
        costPrice: '',
        sellingPrice: '',
        quantityInStock: '',
      });
      setValidationErrors({});
      toast.success('Product added successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.validationErrors) {
        setValidationErrors(error.response.data.validationErrors);
      } else {
        console.error('Error:', error);
      }
    }
  };

  const inputGroupClassName = "input-group  p-4";

 
  return (
      <div className="container mt-3 mb-3 border border-2 rounded-4 shadow " style={{width:"900px"}}>
        <h3 className='text-center rounded-pill  border-bottom  border-dark-subtle mt-3'>
          Add New Product
        </h3>
        <form onSubmit={handleSubmit} method="POST" className="row g-3">
          <div className="row">
            <div className="col mt-5 border-end border-top border-light">
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faTag}/></span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter The Product Name..."
                  required
                />
                {validationErrors.name && <div className="text-danger">{validationErrors.name}</div>}
              </div>
    
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faLayerGroup}/></span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter The Product Category..."
                  list="categoryList"
                />
                <datalist id="categoryList">
                  {Array.from(new Set(categories)).map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
    
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faBuilding}/></span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="brand"
                  placeholder='Entre The Product Brand...'
                  value={formData.brand}
                  onChange={handleChange}
                  list="brandList"
                />
                <datalist id="brandList">
                  {Array.from(new Set(brands)).map((brand) => (
                    <option key={brand} value={brand} />
                  ))}
                </datalist>
                {validationErrors.brand && <div className="text-danger">{validationErrors.brand}</div>}
              </div>
    
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faEdit}/></span>
                <textarea
                  className="form-control form-control-sm"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter The Product Description..."
                  style={{ height: '120px' }}
                  required
                />
                {validationErrors.description && <div className="text-danger">{validationErrors.description}</div>}
              </div>
            </div>
    
            <div className='col mt-5 border-left border-top border-light'>
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  placeholder="Enter The Supplier Name..."
                  list="supplierList"
                />
                <datalist id="supplierList">
                  {Array.from(new Set(suppliers)).map((supplierName) => (
                    <option key={supplierName} value={supplierName} />
                  ))}
                </datalist>
                {validationErrors.supplierName && <div className="text-danger">{validationErrors.supplierName}</div>}
              </div>
              
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faMailForward}/></span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="supplierContactInfo"
                  value={formData.supplierContactInfo}
                  onChange={handleChange}
                  placeholder="Enter The Supplier Contact..."
                  list="supplierInfoList"
                />
                <datalist id="supplierInfoList">
                  {Array.from(new Set(suppliersInfo)).map((supplierInfo) => (
                    <option key={supplierInfo} value={supplierInfo} />
                  ))}
                </datalist>
                {validationErrors.supplierContactInfo && (
                  <div className="text-danger">{validationErrors.supplierContactInfo}</div>
                )}
              </div>
    
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faMoneyBillAlt}/></span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  placeholder="Enter The Cost Price..."
                  required
                />
                {validationErrors.costPrice && <div className="text-danger">{validationErrors.costPrice}</div>}
              </div>
    
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faMoneyBill}/></span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  placeholder="Enter The Selling Price..."
                  required
                />
                {validationErrors.sellingPrice && <div className="text-danger">{validationErrors.sellingPrice}</div>}
              </div>
    
              <div className={inputGroupClassName}>
                <span class="input-group-text"><FontAwesomeIcon icon={faCubes}/></span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="quantityInStock"
                  value={formData.quantityInStock}
                  onChange={handleChange}
                  placeholder="Enter The Quantity In The Stock..."
                  required
                />
                {validationErrors.quantityInStock && (
                  <div className="text-danger">{validationErrors.quantityInStock}</div>
                )}
              </div>
            </div>
          </div>
    
          <center>
            <button type="submit" id="add-product">
              <FontAwesomeIcon icon={faSquarePlus} style={{ marginRight: '8px' }} />Add The Product
            </button>
          </center>
        </form>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      </div>
    );
  
};
export default NewProductForm;
