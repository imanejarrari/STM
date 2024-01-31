import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import {FaUser ,FaDollarSign ,FaCartArrowDown,FaMoneyBillWave } from 'react-icons/fa';
import StockChart from './StockChart';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/dashboardData');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

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
            
          <table className='table' id='latestO'> 
            <thead>
              <tr>
                 <th>Order Id</th>
                <th>Customer</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
             
            </thead>
            <tbody>
          {dashboardData.latestOrders.map((order) => {
            return(
              <tr key={order._id}>
                 <td>{order._id}</td>
                
                <td>{order.customerName}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <div className='stt' style={{ backgroundColor: order.Status === 'Delivered' ? 'greenyellow' : 'red' , paddingLeft: order.Status === 'Delivered' ? '30px' : '20px' }} >
                     {order.Status}
                  </div>
                </td>   
              </tr>

            );
             
           })}
            </tbody>
          </table>
          
        </div>
       
          
      <div className='stock-chart'>
        <h3>Stock Levels</h3>
        <StockChart />
      </div>

       

    </div>
  );
};

export default Dashboard;
