import React from 'react';
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


const Sidebar = () => {


  const userName = localStorage.getItem('userName');
  const LogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem("userName");
    window.location.href = "/";
  };
  
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="rgb(67, 111, 255)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <NavLink exact to="/dashbord" className="sidebar-link">
              <CDBSidebarMenuItem icon='chart-line'>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/main" className="sidebar-link" >
              <CDBSidebarMenuItem icon='list'>Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/stock"  className="sidebar-link">
              <CDBSidebarMenuItem icon="list-alt">Stock In</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/orders"  className="sidebar-link">
              <CDBSidebarMenuItem icon="file-alt">Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/suppliers"  className="sidebar-link">
              <CDBSidebarMenuItem icon="users">Suppliers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/convert" className="sidebar-link">
              <CDBSidebarMenuItem icon="file-excel">Convert Excel File</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  onClick={LogOut}  className="sidebar-link">
              <CDBSidebarMenuItem icon="door-open">Log Out</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>{userName}</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;

