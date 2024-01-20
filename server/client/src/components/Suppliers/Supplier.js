import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const SuppliersList = () => {
  const [uniqueSuppliers, setUniqueSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
        setUniqueSuppliers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductsBySupplier = async (supplierId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/productsBySupplier/${supplierId}`);
      const data = await response.json();
      setSupplierProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
    fetchProductsBySupplier(supplier._id);
    setIsModalOpen(true);
  };

  return (
      
       <div className="container mt-4">
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 ml-5 " style={{ marginRight: "250px", marginLeft: "250px" }}>
        <div className="input-group">
          <input
            type="search"
            placeholder="What're you searching for?"
            aria-describedby="button-addon1"
            className="form-control border-0 bg-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "10px" }}>

      </div>
      <h2>Suppliers List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (

        <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact info</th>
              <th>Address</th>
              <th>Product List</th>
            </tr>
          </thead>
          <tbody>
            {uniqueSuppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.supplierName}</td>
                <td>{supplier.supplierContactInfo}</td>
                <td>{supplier.supplierAddress}</td>
                <td>
                  <button onClick={() => handleSupplierClick(supplier)}>
                    View Products
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Products by {selectedSupplier?.supplierName}</h2>
          <ul>
            {supplierProducts.map((product) => (
              <li key={product._id}>
                {product.name} - {product.description}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default SuppliersList;
