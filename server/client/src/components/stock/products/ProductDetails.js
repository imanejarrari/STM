import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCubes, faMoneyBill, faLayerGroup, faMoneyBillAlt, faBuilding, faUser, faInfoCircle,faClock } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = ({ product }) => {
  const entryDate = new Date(product.date);
  const formattedDate = entryDate.toLocaleDateString();
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Details</h2>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            <FontAwesomeIcon icon={faTag} /> <strong>Name:</strong> {product.name}
          </p>
          <p className="card-text">
          <FontAwesomeIcon icon={faLayerGroup} /> <strong>Category:</strong> {product.category}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faBuilding} /> <strong>Brand:</strong> {product.brand}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faUser} /> <strong>Supplier Name:</strong> {product.supplierName}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faInfoCircle} /> <strong>Supplier Infos:</strong> {product.supplierContactInfo}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faMoneyBillAlt} /> <strong>Cost Price:</strong> {product.costPrice}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faMoneyBill} /> <strong>Selling Price:</strong> {product.sellingPrice}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faCubes} /> <strong>Quantity in Stock:</strong> {product.quantityInStock}
          </p>
          <p className="card-text">
           <FontAwesomeIcon icon={faClock} /> <strong>Entry Date:</strong> {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
