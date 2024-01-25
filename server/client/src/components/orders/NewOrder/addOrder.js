import React, { useState } from 'react';
import './AddOrder.css';

const NewOrderForm = ({ products, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [delivereyDate, setDeliveryDate] = useState('');
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
    if (customerName && selectedProducts.length > 0 && delivereyDate && codePostal) {
      const formattedDate = new Date(delivereyDate).toISOString().split('T')[0];
      setDeliveryDate(formattedDate);
      
      console.log('ISO Delivery Date:', formattedDate);

      console.log('Customer Name:', customerName);
      console.log('Customer Address:', customerAddress);
      console.log('Code Postal:', codePostal);
      console.log('Delivery Date:', formattedDate);
      console.log('Selected Products:', selectedProducts); 

      onSubmit({
        customerName,
        customerAddress,
        codePostal,
        delivereyDate: formattedDate,
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
    <form onSubmit={handleSubmit}  className='New'>
      <table>
       
        <tr>
          <th className='frm'>
          <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          placeholder='Customer Name'
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="customerAddress">Customer Address:</label>
        <input
          type="text"
          id="customerAddress"
          placeholder='Customer Address'
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
          placeholder='codePostal'
          onChange={(e) => setCodePostal(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="delivereyDate">Delivery Date:</label>
       <input
  type="date"
  id="delivereyDate"
  value={delivereyDate}
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
        <div>
        <label htmlFor="quantity">Quantity:</label>
        
           <input
          type="number"
          id="quantity"
          placeholder='quantity'
          value={quantity}
          onChange={handleQuantityChange}
        />
        </div>
       
        <button type="button" onClick={handleAddProduct} className='addProduct'>
          Add Product
        </button>
      </div>
          </th>
          <th className='selected'>
      <div >
        <h3>Selected Products:</h3>
        <ul>
          {selectedProducts.map((product, index) => (
            <li key={index}>
              {products.find((p) => p._id === product.productId)?.name} -{' '}
              {product.quantity}{' '}
              <button type="button" onClick={() => handleRemoveProduct(index)} className='remove'>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className='place'>New Order</button>
          </th>
        </tr>

      </table>
      
      
    </form>
  );
};

export default NewOrderForm;
