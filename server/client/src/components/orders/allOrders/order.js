import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CustomerOrdersList = () => {
  const [customerOrders, setCustomerOrders] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerProducts, setCustomerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/customerOrders/JohnDoe'); // Replace with the actual customer name or ID
        const data = await response.json();
        setCustomerOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
        setError('An error occurred while fetching customer orders. Please try again.');
        setLoading(false);
      }
    };

    fetchCustomerOrders();
  }, []);

  const fetchProductsByOrder = async (orderId) => {
    try {
      console.log('Fetching products for order with ID:', orderId);
      const response = await fetch(`http://localhost:5000/api/orders/orderProducts/${orderId}`);
      const data = await response.json();
      console.log('Fetched products:', data);

      // Set the products for the selected order
      setCustomerProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openModal = (order) => {
    setSelectedCustomer(order.customerName);
    fetchProductsByOrder(order._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setCustomerProducts([]);
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
     
      <h3><u>Customer Orders List</u></h3>
      <Link to="/placeOrder">Add Order</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customerName}</td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => openModal(order)} className='view'>
                    View Products
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Customer Order Products Modal"
        style={{
          content: {
            top: '50%',
            left: '60%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', // Adjust the width as needed
            maxWidth: '600px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            overflow: 'visible', // Set overflow to visible to ensure modal is visible even if content exceeds the height
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className="modal-header">
          <h4>{selectedCustomer}'s Orders :</h4>
          <button className="close-icon" onClick={closeModal} ><FaTimes /></button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {customerProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.costPrice}</td>
                <td>{product.sellingPrice}</td>
                <td>{product.quantityInStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default CustomerOrdersList;
