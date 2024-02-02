import React, { useState, useEffect } from 'react';
import './dashboard.css';
import {FaUser ,FaDollarSign ,FaCartArrowDown,FaMoneyBillWave ,FaEllipsisV  } from 'react-icons/fa';
import StockChart from './StockChart';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/dashboardData');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);
  const handleViewDetails = (orderId) => {
    // You can navigate to the new page using the Link component
    // You can replace '/order-details' with the actual path of your order details page
    // and pass the orderId as a parameter
    setSelectedOrder(orderId);
  };
   

  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  return (
    <div className='dash'>
       <section className='sections'>
         <div className='customers'>
          <p>Customers <FaUser className='totalC'/> </p>
          <h6>total Customers:  {dashboardData.totalCustomers}</h6> 
          
         </div>
          <div className='order'>
            <p>Orders  <FaCartArrowDown className='totalO'/> </p>
            <h6> Total Orders :{dashboardData.totalOrders}</h6> 
          </div>
          <div className='sales'>
            <p>Sales  <FaDollarSign className='totalS' /> </p>
            <h6>Total Sales : {dashboardData.sales} </h6>
          </div>
         
          <div className='earning'>
             <p>Earnings <FaMoneyBillWave className='totalE'/></p>
           <h6>Total Earnings : {dashboardData.earnings} $</h6>  
          </div>
        
       </section>
        
       <div className='latestorders'>
           <div className='Obar'>
            <h4>Recent Orders</h4>
           </div>
            
          <table className='table' id='latestOrders'>  
            <thead>
             
             </thead>
            <tbody>
            {dashboardData.latestOrders.map((order, index) => {
  const orderId = `#${index + 1}`; 
            return(

              <td key={order._id}  id='latestO'>
                  
                 <div className='client'>
                     {orderId}
                    <Link to={`/orderDetails/${order._id}`}
                   onClick={() => handleViewDetails(order._id)}
                  className='lien'  >
                    <FaEllipsisV />
                  </Link>

                  
                 <p>{order.customerName}</p>
                  <h6 id='price'>Price : ${order.totalPrice}</h6>
                  <div className='status' style={{ backgroundColor: order.Status === 'Delivered' ? 'greenyellow' : 'red' , paddingLeft: order.Status === 'Delivered' ? '30px' : '10px' }}>{order.Status}</div>
                 </div>
                  
               
              </td>

            );
             
           })}
            </tbody>
          </table>
          
        </div>


       <div className='chart'>
        <StockChart/>
        </div>   
       
       

    </div>
  );
};

export default Dashboard;
