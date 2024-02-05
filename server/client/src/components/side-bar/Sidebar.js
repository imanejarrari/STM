import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";
import ImageAvatars from"./ImageAvatars"

const Sidebar = () => {

  const [avatreDiv, setAvatareDiv] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="rgb(67, 111, 255)" >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} >
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            OpTiStock
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" className="sidebar-link">
              <CDBSidebarMenuItem icon='chart-line'>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/main" className="sidebar-link" >
              <CDBSidebarMenuItem icon='list'>Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/stock"  className="sidebar-link">
              <CDBSidebarMenuItem icon="list-alt">Stock In</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/allOrders"}  className="sidebar-link">
              <CDBSidebarMenuItem icon="file-alt">Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/suppliers"  className="sidebar-link">
              <CDBSidebarMenuItem icon="users">Suppliers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/convertExcel" className="sidebar-link">
              <CDBSidebarMenuItem icon="file-excel">Convert Excel File</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

           <CDBSidebarFooter>
          <div className='mx-auto mb-2' style={{ width: avatreDiv ? "40px": "200px" ,transition: 'width 0.5s',}} onClick={handlAvatreDiv => {setAvatareDiv(!avatreDiv)}}>
            <ImageAvatars />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
