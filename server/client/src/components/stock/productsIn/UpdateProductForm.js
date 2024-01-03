import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function UpdateProductQuantityForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    productId: '',
    quantityChange: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-4">
      <h2>
        <FontAwesomeIcon icon={faEdit} className="mr-2" />
        Update Product Quantity
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Product ID:
          </label>
          <input
            type="text"
            className="form-control"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Quantity Change:
          </label>
          <input
            type="number"
            className="form-control"
            name="quantityChange"
            value={formData.quantityChange}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Update Quantity
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProductQuantityForm;
