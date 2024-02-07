import React, { useState, useEffect } from 'react';
import NewOrderForm from './addOrder';
import { useNavigate } from 'react-router-dom';
import './AddOrder.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewOrderPage = () => {
  const [products, setProducts] = useState([]); // Fetch products from the server
  const navigate = useNavigate();

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
      if (!orderData.delivereyDate || !orderData.codePostal) {
        // Show an error toast if required fields are missing
        toast.error('Please provide delivery date and code postal');
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.productName) {
          // Product-specific error, display custom message
          toast.error(`Not enough stock for product : ${errorData.productName}`);
        } else {
          // General error
          toast.error(`Failed to place order: ${errorData.error}`);
        }
      } else {
        // Order placed successfully
        toast.success('Order placed successfully!');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  
  };

  return (
    <div>
      <div className='div1'><Link to="/allOrders" exact={true}  className='orders' style={{fontFamily:'sans-serif' , fontWeight:'bold' , color:'black' }}>BACK</Link></div>
      <NewOrderForm products={products} onSubmit={handlePlaceOrder} />

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

export default NewOrderPage;
