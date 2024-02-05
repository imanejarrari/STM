import React from 'react';
import NewProductForm from './ProductForm';
import Sidebar from '../../side-bar/Sidebar';
import './StockPage.css'

function StockPage() {
  return (
    <div className='stock-page'>
      <Sidebar/>
      <NewProductForm />  
    </div>
  );
}

export default StockPage;
