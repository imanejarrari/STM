import React, { useState } from 'react';
import './AddOrder.css';

const NewOrderForm = ({ products, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (customerName && selectedProducts.length > 0 && deliveryDate && codePostal) {
      const isoDeliveryDate = deliveryDate !== "" ? new Date(deliveryDate).toISOString() : "";
      console.log('ISO Delivery Date:', isoDeliveryDate);


      onSubmit({
        customerName,
        customerAddress,
        codePostal,
        deliveryDate: isoDeliveryDate,
        products: selectedProducts,
      });
      setCustomerName('');
      setCustomerAddress('');
      setCodePostal('');
      setDeliveryDate('');
      setSelectedProducts([]);
    } else {
      console.error('Please fill in all required fields');
      // Optionally, you can display an error message to the user
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
          onChange={(e) => setCustomerAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="codePostal">Code Postal:</label>
        <input
          type="number"
          id="codePostal"
          value={codePostal}
          onChange={(e) => setCodePostal(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="deliveryDate">Delivery Date:</label>
       <input
  type="date"
  id="deliveryDate"
  value={deliveryDate}
  onChange={(e) => setDeliveryDate(e.target.value)}
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
