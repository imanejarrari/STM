import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import Select from 'react-select';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag , faSpinner} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  ProductModificationDialog from "./ProductModificationDialog";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState({ value: 'za', label: <i className="fas fa-sort-alpha-up-alt"> <b>Sort From A to Z</b></i> });
  const [hoveredProduct, setHoveredProduct] = useState(null );
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModification, setOpenModification] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/productlist');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductDelete = () => {
    if (!selectedProduct || !selectedProduct._id) {
      console.error("Invalid selected product");
      return;
    }
    setShowConfirmation(true);
  }
  const handleConfirmDelete = () => {
    const productId = selectedProduct._id;

    axios.post('http://localhost:5000/api/products/deleteproduct', { productId })
      .then(response => {
        fetchProducts();
      })
      .catch(error => {
        console.error(error.response.data.error);
      });
    toast.success("The product has been successfully deleted!");
    setSelectedProduct(null);
    setShowConfirmation(false);
    setIsFullWidth(false);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSelectedProduct(null);
    setIsFullWidth(false);
  };
  
  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };
  const handleProductClick = (product) => {
    setSelectedProduct((prevSelectedProduct) =>
      prevSelectedProduct === product ? null : product
    );
  
    setSelectedProduct((newSelectedProduct) => {
      if (newSelectedProduct === product) {
        setIsFullWidth(true);
      } else {
        setIsFullWidth(false);
      }
      return newSelectedProduct;
    });
  };
  


  const customOptions = [
    { value: 'za', label: <i className="fas fa-sort-alpha-up-alt"> <b>Sort From A to Z</b></i> },
    { value: 'az', label: <i className="fas fa-sort-alpha-down-alt"> <b>Sort From Z to A</b></i> },
    { value: 'topQuantity', label: <i className="fas fa-arrow-up"> <b>Sort With Top Quantity</b></i> },
    { value: 'lowQuantity', label: <i className="fas fa-arrow-down"> <b>Sort With Low Quantity</b></i> }
  ];

  const sortedProducts = (products, sortOption) => {
    switch (sortOption.value) {
      case 'za':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'az':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case 'topQuantity':
        return products.sort((a, b) => b.quantityInStock - a.quantityInStock);
      case 'lowQuantity':
        return products.sort((a, b) => a.quantityInStock - b.quantityInStock);
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = sortedProducts(
    products.filter((product) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const lowerCaseProductName = product.name.toLowerCase();
      const lowerCaseProductID = product._id.toLowerCase();
      const lowerCaseCategory = product.category.toLowerCase();
  
      return (
        lowerCaseProductName.includes(lowerCaseSearchTerm) || lowerCaseCategory.includes(lowerCaseSearchTerm)|| lowerCaseProductID.includes(lowerCaseSearchTerm)
      );
    }),
    sortOption
  );
  

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, []);

  const openModificationModal = () => {
    setOpenModification(true);
  }

  const closeModification = () => {
    setOpenModification(false);
  }

  return (
    <div className={`container mt-4 ${isFullWidth ? 'w-100' : ''}`}>
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 ml-5" style={{ marginRight: "250px", marginLeft: "250px" }}>
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
        <h3 className={`${isFullWidth? 'rounded-pill title border-bottom  border-dark-subtle ' : 'text-center rounded-pill  border-bottom  border-dark-subtle'}`}>Product List</h3>
        {loading ? (
          <p style={{ fontSize:"30px" }}>
            Loading... <FontAwesomeIcon icon={faSpinner} spin style={{ marginLeft: "8px" }} />
          </p>
        ) : (
        <div className={isFullWidth ? 'col-md-6 border-end' : ''}>
          <Select
            options={customOptions}
            value={sortOption}
            onChange={handleSortChange}
            isSearchable={false}
          />

          <ul className="list-group" style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "8px" }}>
            {filteredAndSortedProducts.map((product) => (
              <li
                key={product._id}
                style={{
                  userSelect: "none",
                  padding: "28px",
                  cursor: "pointer",
                  backgroundColor: hoveredProduct === product
                      ? "#e0e0e0"
                      : "inherit",
                }}
                className="list-group-item d-flex justify-content-between align-items-start"
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setHoveredProduct(product)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold" style={{fontSize:"25px", marginLeft:"-15px",}}><span className="mx-2"  >{product.name}</span></div>
                  <div style={{ marginLeft: '12px', fontSize:"20px" }} ><FontAwesomeIcon icon={faUserTag} className=' mx-3' />{product.supplierName}</div>
                </div>
                <span
                  className={`badge bg-primary text-wrap rounded-start-pill p-3 ${
                    product.quantityInStock === 0
                      ? 'bg-danger'
                      : product.quantityInStock < 5
                        ? 'bg-warning'
                        : ''
                  }`}
                  style={{ marginTop: '15px' }}
                >
                  Quantity: {product.quantityInStock}
                </span>
              </li>
            ))}
          </ul>
        </div>
        )}
        <div className={isFullWidth ? 'col-md-6' : ''} id="pr-dt">
          {selectedProduct && <h3 style={{ marginTop: "-44px"}} className="text-center border-bottom border-dark-subtle rounded-pill">Product Details</h3>}
          {selectedProduct && <ProductDetails product={selectedProduct} />}
          {selectedProduct && 
           <div className='row'>
           <div className="col p-2"  style={{ marginLeft: "58px", marginTop: "10px" }}>
             <ProductModificationDialog showModal={openModification} selectedProduct={selectedProduct} closeModal={closeModification} />
           </div>
           <div className="col mr-2">
             <button
               className="btn btn-danger "
               style={{ marginLeft: "28px", marginTop: "18px" }}
               onClick={handleProductDelete}
             >
               Delete The Product 
             </button>
           </div>
         </div>
          }
        
          {showConfirmation && (
          <div className="confirmation-modal-overlay">
              <div className="confirmation-modal p-4">
                <p><b>Are you sure you want to delete this product?</b></p>
                <button className="btn btn-danger p-2 w-25 " onClick={handleConfirmDelete}>Yes</button>
                <button className="btn btn-primary p-2 w-25" onClick={handleCancelDelete}>No</button>
              </div>
           </div>
            )}
           </div>
        </div>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          autoClose={5000}
        />
    </div>
  );
};

export default ProductList;
