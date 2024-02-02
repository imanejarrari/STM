import React, { useState, useEffect } from 'react';
import './dashboard.css';
import {FaUser ,FaDollarSign ,FaCartArrowDown,FaMoneyBillWave } from 'react-icons/fa';
import StockChart from './StockChart';



const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

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
          {dashboardData.latestOrders.map((order) => {
            return(
              <td key={order._id}  id='latestO'>
                  
                 <div className='client'>
                  <div >{order.customerName}</div>
                  <div>${order.totalPrice}</div>
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
