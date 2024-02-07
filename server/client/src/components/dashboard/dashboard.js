import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { FaUser, FaDollarSign, FaCartArrowDown, FaMoneyBillWave, FaEllipsisV, FaBars } from 'react-icons/fa';
import StockChart from './StockChart';
import { Link } from 'react-router-dom';
import BarChart from './EarningsChart';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalProductsPerSupplier, setTotalProductsPerSupplier] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/dashboardData');
        const data = await response.json();
        setDashboardData(data);

        // Fetch total products per supplier
        const totalProductsPerSupplierResponse = await fetch('http://localhost:5000/api/dashboard/totalProductsPerSupplier');
        const totalProductsPerSupplierData = await totalProductsPerSupplierResponse.json();
        setTotalProductsPerSupplier(totalProductsPerSupplierData);

                // Update order status based on delivery date
                data.latestOrders.forEach(order => {
                  if (isDeliveryDelivered(order.delivereyDate) && order.Status !== 'Delivered') {
                    updateOrderStatus(order._id, 'Delivered');
                  }
                });
        

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`http://localhost:5000/api/orders/updateStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle error appropriately
    }
  };

  const isDeliveryDelivered = (deliveryDate) => {
    const formattedToday = new Date().toISOString().split('T')[0];
    return formattedToday >= deliveryDate.split('T')[0];
  };

  const handleViewDetails = (orderId) => {
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
        
       <div>
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
        <div className='latestcustomers'>
          <h5>Latest suppliers  <FaBars className='fbars'  /> </h5>
         
          
          <table className='table' id='tbl' >  
            <thead>
              <div className='suplr'>
                <th>Supplier</th>
                <th>contact</th>
                <th>total products</th>
              </div>
             </thead>
            <tbody>
            {dashboardData.latestSupplier?.map((supplier) => {
              const totalQuantity = totalProductsPerSupplier.find((item) => item._id === supplier.supplierName)?.totalQuantity || 0;

              return (
               <div className='AllSup'> 
                 <tr key={supplier._id} id='latestS'>
             
             
                 <td className='icn'>
                    <FaUser />
                  </td>
                  <td className='name'> {supplier.supplierName} </td>
                  <td className='contact'>{supplier.supplierContactInfo} </td>
                  <td>{totalQuantity}</td>
             
                 
                </tr>
                 </div>


            );
             
           })}
            </tbody>
          </table>


        </div>
       </div>
 
  
       <div className='chart'>
        <StockChart/>  
        
      </div> 
        <div  className='bar'>
          <BarChart/>
         </div>

    </div>
  );
};

export default Dashboard;
