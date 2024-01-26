import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './details.css';
import { FaUser ,FaInfoCircle ,FaTruck } from 'react-icons/fa';


const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          
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
                <table>
                  <thead>
                     <th>Products</th>
                     <th>Quantity</th>
                     <th>Total Price</th>
                     <th>Edit</th>
                  </thead>
                  <tbody>
                     <td>
                      <ul>
                      {orderDetails.products.map((product) => (
                        <li key={product.productId}>
                          {product.quantity} x {product.productName}
                        </li>
                      ))}

                      </ul>
                     </td>
                     <td>
            
                      </td>
                     <td>{orderDetails.totalPrice}</td>
                  </tbody>
                 </table>

        </div>
      )}
    </div>
  );
};

export default OrderDetails;
