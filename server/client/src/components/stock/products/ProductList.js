import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
        setProducts(data);
        console.log(data);
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Product List</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ul className="list-group">
            {filteredProducts.map((product) => (
              <li
                key={product._id}  
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleProductClick(product)}
              > 
                {product.name}
                <span
                  className={`badge bg-primary rounded-pill ${
                    product.quantityInStock === 0
                      ? 'bg-danger'
                      : product.quantityInStock < 5
                      ? 'bg-warning'
                      : ''
                  }`}
                >
                  Quantity: {product.quantityInStock}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
