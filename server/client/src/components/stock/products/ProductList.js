import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import './MainPage.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState({ value: 'za', label: <i className="fas fa-sort-alpha-up-alt"></i> });
  const [checkboxVisible, setCheckboxVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct((prevSelectedProduct) =>
      prevSelectedProduct === product ? null : product
    );
  };

  const handleProductDoubleClick = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts([]);
      setCheckboxVisible(false);
    } else {
      handleSelectProduct(product);
      setCheckboxVisible(true);
    }
  };

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };

  const customOptions = [
    { value: 'za', label: <i className="fas fa-sort-alpha-up-alt"></i> },
    { value: 'az', label: <i className="fas fa-sort-alpha-down-alt"></i> },
    { value: 'topQuantity', label: <i className="fas fa-arrow-alt-circle-up"></i> },
    { value: 'lowQuantity', label: <i className="fas fa-arrow-alt-circle-down"></i> },
  ];

  const sortedProducts = (products, sortOption) => {
    const sortedArray = [...products];

    switch (sortOption.value) {
      case 'za':
        return sortedArray.sort((a, b) => a.name.localeCompare(b.name));
      case 'az':
        return sortedArray.sort((a, b) => b.name.localeCompare(a.name));
      case 'topQuantity':
        return sortedArray.sort((a, b) => b.quantityInStock - a.quantityInStock);
      case 'lowQuantity':
        return sortedArray.sort((a, b) => a.quantityInStock - b.quantityInStock);
      default:
        return sortedArray;
    }
  };

  const filteredAndSortedProducts = sortedProducts(
    products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortOption
  );

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedProducts(filteredAndSortedProducts);
  };

  const handleDeleteSelected = () => {
    console.log('Deleting selected products:', selectedProducts);
    setSelectedProducts([]);
    setCheckboxVisible(false);
  };

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
        <h2>Product List</h2>
        <div className="col-md-6 border-end" >
          <div style={{ width: "190%", display: "flex", alignItems: "center", justifyContent: "center", marginTop:"-18px" , marginBottom:"8px"}}>
            <Select
              options={customOptions}
              value={sortOption}
              onChange={handleSortChange}
              isSearchable={false}
              styles={{
                dropdownIndicator: () => ({ display: 'none' }),
              }}
            />
          </div>
          <ol className="list-group list-group-numbered" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {filteredAndSortedProducts.map((product) => (
              <li
                key={product._id}
                style={{ userSelect: "none" }}
                className="list-group-item d-flex justify-content-between align-items-start"
                onClick={() => handleProductClick(product)}
                onDoubleClick={() => handleProductDoubleClick(product)}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{product.name}</div>
                  <div style={{ marginLeft: '8px', }}>{product.category}</div>
                </div>
                <span
                  className={`badge bg-primary rounded-pill ${
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
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product)}
                  onChange={() => handleSelectProduct(product)}
                  style={{ display: checkboxVisible ? 'block' : 'none' }}
                />
              </li>
            ))}
          </ol>
        </div>
        <div className="col-md-6" >
          {checkboxVisible && (
            <div>
              <button className="btn btn-primary" onClick={handleSelectAll}>
                Select All
              </button>
              <button className="btn btn-danger ms-2" onClick={handleDeleteSelected}>
                Delete Selected
              </button>
            </div>
          )}
          {selectedProduct && <ProductDetails product={selectedProduct} />}
          {selectedProduct && <h3 style={{ textAlign: "center" }}>Product Details</h3>}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
