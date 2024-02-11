import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';


const SuppliersList = () => {
  const [uniqueSuppliers, setUniqueSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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

      setSupplierProducts((prevProducts) => [...prevProducts, ...data]);
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
  const totalProducts = supplierProducts.length;
  const totalQuantityInStock = supplierProducts.reduce((total, product) => total + product.quantityInStock, 0);

  const filteredSuppliers = uniqueSuppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const changeDateFormat = (e) =>{
    const parsedDate = new Date(e);
    if (isNaN(parsedDate.getTime())) {
     return "Invalid Date";
    }
    const options = {
     year: "numeric",
     month: "2-digit",
     day: "2-digit",
   };
    const formattedInputDate = parsedDate.toLocaleString("fr-FR", options);
    return formattedInputDate;
  }  

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (sortColumn) {
      if (sortOrder === 'asc') {
        return a[sortColumn].localeCompare(b[sortColumn]);
      } else {
        return b[sortColumn].localeCompare(a[sortColumn]);
      }
    }
    return 0;
  });
  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return null;
  };
  return (
    <div className="container mt-4" >
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
      <h3><u>Suppliers List</u></h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <div className="container border-light" style={{maxHeight: "450px", overflowY: "auto", width:"1000px"}}>
        <table className='table table-hover shadow p-1 mb-4 bg-body rounded'>
        <thead style={{cursor:"pointer"}}>
          <tr>
            <th onClick={() => handleSort('supplierName')}>
              Name {getSortIcon('supplierName')}
            </th>
            <th onClick={() => handleSort('supplierContactInfo')}>
              Contact info {getSortIcon('supplierContactInfo')}
            </th>
            <th onClick={() => handleSort('date')}>
              <center>Registration Date {getSortIcon('date')}</center>
            </th>
            <th>
              <center>Action</center>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSuppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.supplierName}</td>
              <td>{supplier.supplierContactInfo}</td>
              <td>
                <center>{changeDateFormat(supplier.date)}</center>
              </td>
              <td>
                <center>
                  <button onClick={() => openModal(supplier)} className='view'>
                    View Products
                  </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
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
            width: '60%', 
            Width: '600px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            overflow:"visible", 
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className="modal-header">
        <h4> {selectedSupplier && selectedSupplier.supplierName}'s Product List :</h4>
            <button className="close-icon btn btn-primary" onClick={closeModal} ><FaTimes className='close-model' /></button>
        </div>
        <div style={{maxHeight:"350px", overflowY:"auto"}} className='mt-3 mb-3'>
          <table className='table table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>costPrice</th>
              <th>selling Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {supplierProducts.map((product) => (
              <tr key={product.supplierName}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.costPrice}</td>
                <td>{product.sellingPrice}</td>
                <td>{product.quantityInStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='container'>
          <div className='row align-item-center'>
        <div className='total col text-center p-1 text-uppercase'>Total Products: {totalProducts}</div>
        <div className='quantity col text-center p-1 text-uppercase'>Total Quantity in Stock: {totalQuantityInStock}</div>
        </div>
        </div>
      </Modal>
     </div>
  );
};

export default SuppliersList;
