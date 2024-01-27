import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import './details.css';
import { FaUser ,FaInfoCircle ,FaTruck  ,FaTrash  } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/orderDetails/${orderId}`);
        const data = await response.json();
        setOrderDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // Handle error
      }
    };

    fetchOrderDetails();
  }, [orderId]);
  const handleDeleteOrder = async () => {
    try {
      // Make a request to delete the order
      const response = await fetch(`http://localhost:5000/api/orders/deleteOrder/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion (e.g., redirect to a different page)
        console.log('Order deleted successfully');
        navigate('/allOrders'); 
      } else {
        console.error('Failed to delete order:', response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      // Handle error
    }
  };


  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button className='nag'><Link to='/allOrders' className='link'>Back To Orders</Link></button> 
          
            <div className='customer'> 
               
                <div className='User'>
                  <h5><FaUser className='FaUser'/>Customer :</h5>
                   <p>FullName:  {orderDetails.customerName}</p>
                </div>
                 <div className='Info'>
                  <h5><FaInfoCircle className='FaUser' />Order Info :</h5>
                  <p>Order ID: {orderDetails._id}</p>
                  <p>Delivery Date : {orderDetails.delivereyDate}</p>
                 </div>
                 <div className='Deliver'>
                      <h5><FaTruck className='FaUser' /> Deliver to :</h5>
                      <p>Address : {orderDetails.customerAddress}</p>
                      <p>code Postal :{orderDetails.codePostal}</p>

                 </div>     

            </div>
                <table className='table'  id='display'>
                  <thead>
                    <tr>
                      <th>Product info</th>
                     <th>Total Quantity</th>
                     <th>Total Price</th>
                     <th>Action</th>
                    </tr>
                     
                  </thead>
                  <tbody>
                    <tr>
                    <td>
                      <ul>
                      {orderDetails.products.map((product) => (
                        <li key={product.productId}>
                          {product.quantity} <b>products of </b> {product.productId}
                        </li>
                      ))}

                      </ul>
                     </td>
                     <td>
                     {orderDetails.totalQuantity}
                      </td>
                     <td>${orderDetails.totalPrice}</td>
                     <td> <FaTrash  className='trash'   onClick={handleDeleteOrder} />  
                    </td>
                    </tr>
                 
                  </tbody>
                 </table>

        </div>
      )}
    </div>
  );
};

export default OrderDetails;
