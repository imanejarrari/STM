import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { FaUser, FaCartArrowDown,FaMoneyCheckAlt, FaEllipsisV } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { FcSalesPerformance } from "react-icons/fc";
import StockChart from './StockChart';
import { Link } from 'react-router-dom';
import Map from './map/Map';
import OrderByDateChart from './OrderByDateChart';

function extractDateFromTimestamp(timestamp) {
  const dateObject = new Date(timestamp);
  const year = dateObject.getUTCFullYear();
  const month = dateObject.getUTCMonth() + 1; 
  const day = dateObject.getUTCDate();

  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

  return formattedDate;
}


const Dashboard = () => {
  const displayedNames = new Set();
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [totalProductsPerSupplier, setTotalProductsPerSupplier] = useState([]); // Initialize as an empty array
  const [open , setOpen] = useState(false);
  const [openMap , setOpenMap] = useState(false);

  const handleOrderOpen = () =>{
    setOpen(!open);
    setOpenMap(false);
  }

  const handleOpenMAp = () =>{
    setOpen(false);
    setOpenMap(!openMap);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/dashboardData');
        const data = await response.json();
        setDashboardData(data);

        const totalProductsPerSupplierResponse = await fetch('http://localhost:5000/api/dashboard/totalProductsPerSupplier');
        const totalProductsPerSupplierData = await totalProductsPerSupplierResponse.json();
        setTotalProductsPerSupplier(totalProductsPerSupplierData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (orderId) => {
    setSelectedOrder(orderId);
  };
   
  
  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  return (
    <div className='dash container '>
       <section className='row '>
         <div className='customers col' onClick={()=>{setOpenCustomers(!openCustomers)}} style={{cursor:"pointer"}}>
          <p>Customers: <FaUser className='totalC'/> </p>
          <h6>total Customers:  {dashboardData.totalCustomers}</h6> 
          {openCustomers && 
            <Modal show={openCustomers} onHide={() => setOpenCustomers(!openCustomers)}>
              <Modal.Header>
              <Modal.Title>Customers :</Modal.Title>
              </Modal.Header>
                <Modal.Body style={{maxHeight:"400px", overflowY:"auto"}}>
                  {dashboardData.customerNames.map((customer, index) => {
                    if (!displayedNames.has(customer.name)) {
                      displayedNames.add(customer.name);
                      return (
                        <div key={index} className='container text-center'>
                          <div className='row align-items-start'>
                            <div className="col border-bottom">
                              <p>{customer.name}</p>
                            </div>
                            <div className="col mx-2"><p>From</p></div>
                            <div className="col border-bottom">
                              <p>{customer.address}</p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setOpenCustomers(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          }
         </div>
          <div className='customers col'>
          <Link to="/AllOrders" style={{ textDecoration: 'none', color: 'inherit' }}>
            <p style={{color:"grey" , fontFamily:"Times New Roman" , fontSize:"large"}}>Orders: <FaCartArrowDown className='totalC'/> </p>
            <h6 style={{ marginLeft:"20px"}}> Total Orders: {dashboardData.totalOrders}</h6> 
          </Link>
          </div>
          <div className='customers col'>
            <p>Sales: <FaMoneyCheckAlt  className='totalC'/></p>
            <h6>Total Sales: {dashboardData.sales}</h6>
          </div>
         
          <div className='customers col'>
             <p>Earnings  <FcSalesPerformance className='totalC' /> </p>
           <h6 style={{marginLeft:"10px"}}>{dashboardData.earnings.toFixed(2)} MAD</h6>  
          </div>
        
       </section>
        
       <div>
  <div className='latestorders mt-3'>
    <div className='row' >
      <div className='col dashClass ' onClick={handleOrderOpen} style={{ cursor: "pointer" }}>
        <h4 className='text-center p-1 pt-2'>Recent Orders</h4>
      </div>
      <div className='col dashClass border-start'  onClick={handleOpenMAp} style={{ cursor: "pointer" }}>
        <h4 className='text-center p-1 pt-2'>Map Dashboard.</h4>
      </div>
    </div>
    {openMap && (
       <div className='container shadow'>
          <center><Map /></center> 
        </div>
    )}
   {open && (
  <Modal show={open} onHide={() => setOpen(!open)}>
    <Modal.Header closeButton>
      <Modal.Title>Latest Orders</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ overflowY: 'auto', maxHeight:"440px",overflowX:"hidden"}}>
    {dashboardData.latestOrders.slice(-5).map((order, index) => {
  const orderId = `${index + 1}`;
  return (
    <div className='card mx-5 my-2 shadow-sm' style={{ width: "24rem" }} key={order._id}>
      <div className='card-body'>
        <div className='d-flex'>
          <div className='p-1 flex-grow-1'>
            {orderId}
          </div>
          <div className='p-1'>
            <Link to={`/orderDetails/${order._id}`} onClick={() => handleViewDetails(order._id)}>
              <FaEllipsisV />
            </Link>
          </div>
        </div>
        <h2 className='card-title'>{order.customerName}</h2>
        <h4 className='card-subtitle mb-2 text-body-secondary'>Price : {order.totalPrice.toFixed(2)} MAD</h4>
        <div className='d-flex '>
          <div className='p-2 flex-fill'>
          Deliverey Date:<br/>{extractDateFromTimestamp(order.delivereyDate)}
             </div>
          <div className='p-2 flex-fill status card-text d-flex justify-content-center mt-4'  style={{ backgroundColor: order.status === 'Delivered' ? 'greenyellow' : 'red' }}>
              {order.status}
          </div>
        </div>
      </div>
    </div>
  );
})}

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)}
  </div>
</div>
{!openMap &&
  <div className='container-sm row mt-2'>
        <div className='container-sm shadow mx-4 col '>
            <div style={{marginTop:"40px"}}><OrderByDateChart/></div>
         </div>
        <div className=' container-sm shadow mx-4 col '>
        <div className='mb-2'>
          <StockChart/>
          </div>  
        </div>
    </div>
}
    </div>
  
  );
};

export default Dashboard;
