import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCubes, faMoneyBill, faLayerGroup, faMoneyBillAlt, faBuilding, faUser, faInfoCircle,faClock } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = ({ product }) => {
  const entryDate = new Date(product.date);
  const formattedDate = entryDate.toLocaleDateString();
  return (
    <div className="container mt-3 ">
      <div className="card shadow-sm p-1 rounded">
        <div className="card-body " style={{padding:"5px"}}>
          
          <p className="card-text labelDesign border-bottom  border-dark-subtle ">
            <FontAwesomeIcon icon={faTag}  style={{marginRight:"12px", marginLeft:"8px"}}/><strong>Name:</strong> {product.name}
          </p>
          <p className="card-text  labelDesign border-bottom border-dark-subtle ">
          <FontAwesomeIcon icon={faLayerGroup} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong>Category:</strong> {product.category}
          </p>
          <p className="card-text labelDesign border-bottom border-dark-subtle">
            <FontAwesomeIcon icon={faBuilding} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong>Brand:</strong> {product.brand}
          </p>
          <p className="card-text labelDesign border-bottom border-dark-subtle " >
            <FontAwesomeIcon icon={faUser} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong> Supplier:</strong> {product.supplierName}
          </p>
          <p className="card-text labelDesign border-bottom border-dark-subtle ">
            <FontAwesomeIcon icon={faInfoCircle} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong>Supplier Infos:</strong> {product.supplierContactInfo}
          </p>
          <p className="card-text labelDesign border-bottom border-dark-subtle ">
            <FontAwesomeIcon icon={faMoneyBillAlt} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong>Cost Price:</strong> {product.costPrice}
          </p>
          <p className="card-text labelDesign border-bottom border-dark-subtle ">
            <FontAwesomeIcon icon={faMoneyBill} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong>Selling Price:</strong> {product.sellingPrice}
          </p>
          <p className="card-text labelDesign border-bottom border-dark-subtle ">
            <FontAwesomeIcon icon={faCubes} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong>Quantity in Stock:</strong> {product.quantityInStock}
          </p>
          <p className="card-text labelDesign border-bottom border-dark-subtle ">
           <FontAwesomeIcon icon={faClock} style={{marginRight:"12px", marginLeft:"8px"}} /> <strong>Entry Date:</strong> {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
