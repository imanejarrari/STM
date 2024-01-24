import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CustomerOrdersList = () => {
  const [customerOrders, setCustomerOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (customerName) => {
      try {
        // Replace the URL with your actual API endpoint for fetching customer orders
        const response = await fetch(`http://localhost:5000/api/orders/customerOrders/${customerName}`);
        const data = await response.json();

        setCustomerOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductsByOrder = async (orderId) => {
    try {
      console.log('Fetching products for order with ID:', orderId);
      // Replace the URL with your actual API endpoint for fetching products by order
      const response = await fetch(`http://localhost:5000/api/products/productsByOrder/${orderId}`);
      const data = await response.json();
      console.log('Fetched products:', data);

      // Append the new products to the existing list
      setOrderProducts((prevProducts) => [...prevProducts, ...data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    fetchProductsByOrder(order._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setOrderProducts([]);
  };

  

  const filteredOrders = customerOrders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 ml-5 " style={{ marginRight: "250px", marginLeft: "250px" }}>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search by customer name"
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
      <Link to="/placeOrder">Add New Order</Link>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Delivery Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.delivereyDate}</td>
                <td>{order.totalPrice}</td>
                <td>{order.Status}</td>
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
        contentLabel="Order Products Modal"
        style={{
          content: {
            top: '50%',
            left: '60%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            overflow: 'visible',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className="modal-header">
          <h4>{selectedOrder && selectedOrder.customerName}'s Order Details:</h4>
          <button className="close-icon" onClick={closeModal}><FaTimes /></button>
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
            {orderProducts.map((product) => (
              <tr key={product.supplierName}>
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
