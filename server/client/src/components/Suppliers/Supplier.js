import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const SuppliersList = () => {
  const [uniqueSuppliers, setUniqueSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
        // Filter out duplicate suppliers based on name
        const uniqueSuppliersList = data.filter((supplier, index, self) =>
          index === self.findIndex((s) => s.supplierName === supplier.supplierName)
        );

        setUniqueSuppliers(uniqueSuppliersList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductsBySupplier = async (supplierName) => {
    try {
      console.log('Fetching products for supplier with ID:', supplierName);
      const response = await fetch(`http://localhost:5000/api/products/productsBySupplier/${supplierName}`);
      const data = await response.json();
      console.log('Fetched products:', data);
      setSupplierProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openModal = (supplier) => {
    setSelectedSupplier(supplier);
    fetchProductsBySupplier(supplier.supplierName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
    setSupplierProducts([]);
  };

  const filteredSuppliers = uniqueSuppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <h2>Suppliers List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact info</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.supplierName}</td>
                <td>{supplier.supplierContactInfo}</td>
                <td>{supplier.supplierAddress}</td>
                <td>
                  <button onClick={() => openModal(supplier)} className='view'>
                    View Products
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Supplier Products Modal"
        style={{
          content: {
            top: '50%',
            left: '60%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', // Adjust the width as needed
            maxWidth: '600px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            overflow: 'visible', // Set overflow to visible to ensure modal is visible even if content exceeds the height
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h4>{selectedSupplier && selectedSupplier.supplierName} Product List :</h4>
        {supplierProducts.map((product) => (
          <div key={product.supplierName}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Description</th>
                  <th>costPrice</th>
                  <th>selling Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.description}</td>
                  <td>{product._costPrice}</td>
                  <td>{product.sellingPrice}</td>
                  <td>{product.quantityInStock}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default SuppliersList;
