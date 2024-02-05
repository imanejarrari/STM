import React from 'react';
import Sidebar from '../side-bar/Sidebar';
import AddProductsFromExcel from './AddProductsFromExcel';
import './ExcelPage.css';

const ExcelPage = () => {
  return (
    <div className="Excel-page">
        <Sidebar  />
        <AddProductsFromExcel />
    </div>
  );
};

export default ExcelPage;
