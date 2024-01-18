import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ visible, toggleDropdown }) => {
  return (
    <div className={`dropdown ${visible ? 'visible' : ''}`}>
      <ul>
        <li onClick={toggleDropdown}>
          <Link to="/Suppliers">All Suppliers</Link>
        </li>
        <li onClick={toggleDropdown}>
          <Link to="/Suppliers/newSupplier/AddSupplier">Add New Suppliers</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;