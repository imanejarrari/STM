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
import { useUser } from '../LoginPage/Auth/UserContext';


const Sidebar = () => {

  const { userFullName } = useUser();

  const LogOut = () => {
    localStorage.removeItem('authToken');
    window.location.href = "/";
  };
  
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="royalblue">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='list'>Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/main" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='chart-line'>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/stockIn" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list-alt">Stock In</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/orders" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt">Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/suppliers" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Suppliers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/convert" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-excel">Convert Excel File</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  onClick={LogOut} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="door-open">Log Out</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>{userFullName}</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
