import React from 'react';
import NewProductForm from './ProductForm';

function StockPage() {
  const handleNewProductSubmit = (newProductData) => {
    console.log('New Product Data:', newProductData);
  };

  return (
    <NewProductForm onSubmit={handleNewProductSubmit} />  
  );
}

export default StockPage;
