import React from 'react';
import AddSupplier from '../NewSupplier/AddSupplier';
import Sidebar from '../../side-bar/Sidebar';

function SuppIn() {
  const handleNewProductSubmit = (newSupplierData) => {
    console.log('New Supplier Data:', newSupplierData);
  };

  return (
    <div className='stock-page'>
      <Sidebar/>
      <AddSupplier onSubmit={handleNewProductSubmit} />  
    </div>
  );
}

export default SuppIn;
