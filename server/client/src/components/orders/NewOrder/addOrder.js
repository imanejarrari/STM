import React, { useState, useEffect } from 'react';
import './AddOrder.css';

const NewOrderForm = ({ products, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setcustomerAddress] = useState('');
  const [CodePostal, setCodePostal] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [delivereyDate, setdelivereyDate] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddProduct = () => {
    if (selectedProductId && quantity) {
      const productToAdd = {
        productId: selectedProductId,
        quantity: parseInt(quantity, 10),
      };

      setSelectedProducts([...selectedProducts, productToAdd]);
      setQuantity('');
      setSelectedProductId('');
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerName && selectedProducts.length > 0) {
      onSubmit({ customerName, products: selectedProducts });
      setCustomerName('');
      setSelectedProducts([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="customerAddress">Customer Address:</label>
        <input
          type="text"
          id="customerAddress"
          value={customerAddress}
          onChange={(e) => setcustomerAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="CodePostal">Code Postal:</label>
        <input
          type="Number"
          id="CodePostal"
          value={CodePostal}
          onChange={(e) => setCodePostal(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="delivereyDate">Deliverey Date:</label>
        <input
          type="date"
          id="delivereyDate"
          value={delivereyDate}
          onChange={(e) => setdelivereyDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="selectedProduct">Select Product:</label>
        <select
          id="selectedProduct"
          value={selectedProductId}
          onChange={handleProductChange}
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      <div>
        <h3>Selected Products:</h3>
        <ul>
          {selectedProducts.map((product, index) => (
            <li key={index}>
              {products.find((p) => p._id === product.productId)?.name} -{' '}
              {product.quantity}{' '}
              <button type="button" onClick={() => handleRemoveProduct(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit">Place Order</button>
    </form>
  );
};

export default NewOrderForm;
