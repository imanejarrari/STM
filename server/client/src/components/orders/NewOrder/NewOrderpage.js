import React, { useState, useEffect } from 'react';
import NewOrderForm from './addOrder';

import { Link } from 'react-router-dom';

const NewOrderPage = () => {
  const [products, setProducts] = useState([]); // Fetch products from the server

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

  const handlePlaceOrder = async (orderData) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order placed successfully:', result.order);
        // Handle success, e.g., redirect to order details page
      } else {
        console.error('Failed to place order:', response.statusText);
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
     
      <h2>New Order</h2>
      <NewOrderForm products={products} onSubmit={handlePlaceOrder} />
      
    </div>
  );
};

export default NewOrderPage;
