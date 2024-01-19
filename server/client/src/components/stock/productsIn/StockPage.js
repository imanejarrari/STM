import React from 'react';
import NewProductForm from './ProductForm';
import Sidebar from '../../side-bar/Sidebar';
import './StockPage.css'

function StockPage() {
  const handleNewSupplierSubmit = (newProductData) => {
    console.log('New Product Data:', newProductData);
  };

  return (
    <div className='stock-page'>
      <Sidebar/>
      <NewProductForm onSubmit={handleNewSupplierSubmit} />  
    </div>
  );
}

export default StockPage;
