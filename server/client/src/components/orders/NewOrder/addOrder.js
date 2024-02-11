import React, { useState } from 'react';
import './AddOrder.css';


const regionsData = {
  'Tanger-Tetouan-Al Hoceima': ['Al Hoceima', 'Chefchaouen', 'Anjra', 'Larache', 'Md iq', 'Ouazzane', 'Tangier', 'Tetouan'],
  'L Oriental': ['Berkane', 'Driouch', 'Figuig', 'Guercif', 'Jerada', 'Nador', 'Oujda', 'Taourirt'],
  'Draa-Tafilalet': ['Errachidia', 'Midelt', 'Ouarzazate', 'Tinghir', 'Zagora'],
  'Souss-Massa': ['Agadir', 'Biougra', 'Inezgane', 'Taroudant', 'Tata', 'Tiznit'],
  'Guelmim-Oued Noun': ['Assa', 'Guelmim', 'Sidi Ifni', 'Tan-Tan'],
  'Casablanca-Settat': ['Benslimane', 'Berrechid', 'Casablanca', 'El Jadida', 'Mediouna', 'Mohammedia', 'Nouaceur', 'Settat', 'Sidi Bennour'],
  'Marrakech-Safi': ['Tahannaout', 'Chichaoua', 'Kalaat Sraghna', 'Essaouira', 'Marrakesh', 'Ben Guerir', 'Safi', 'Youssoufia'],
  'Laayoune-Sakia El Hamra': ['Boujdour', 'Smara', 'Laayoune', 'Tarfaya'],
  'Dakhla-Oued Ed-Dahab': ['Aousserd', 'Dakhla'],
  'Rabat-Sale-Kenitra': ['Kenitra', 'Khemisset', 'Rabat', 'Sale', 'Sidi Kacem', 'Sidi Slimane', 'Temara'],
  'Fes-Meknes': ['Boulemane', 'El Hajeb', 'Fez', 'Ifrane', 'Meknes', 'Moulay Yacoub', 'Sefrou', 'Taounate', 'Taza'],
  'Beni Mellal-Khenifra': ['Azilal', 'Beni Mellal', 'Fquih Ben Salah', 'Khenifra', 'Khouribga'],
};



const NewOrderForm = ({ products, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [delivereyDate, setDeliveryDate] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setCustomerAddress('');
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCustomerAddress(city);
  };

  const handleAddProduct = () => {
    if (selectedProductId && quantity) {
      const productToAdd = {
        productId: selectedProductId,
        quantity: parseInt(quantity, 10),
      };

      setSelectedProducts([...selectedProducts, productToAdd]);
      setQuantity('');
      setSelectedProductId('');
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (customerName && selectedProducts.length > 0 && delivereyDate && customerAddress) {
      const formattedDate = new Date(delivereyDate).toISOString().split('T')[0];
      setDeliveryDate(formattedDate);
      
      console.log('ISO Delivery Date:', formattedDate);

      console.log('Customer Name:', customerName);
      console.log('Delivery Date:', formattedDate);
      console.log('Selected Products:', selectedProducts); 

      onSubmit({
        customerName,
        customerAddress,
        delivereyDate,
        products: selectedProducts,
      });
      


      setCustomerName('');;
      setSelectedRegion('');
      setDeliveryDate('');
      setSelectedProducts([]);
    } else {
      console.error('Please fill in all required fields');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="New">
  <div className="container mb-2 border border-2 rounded-4 shadow mt-1 mx-4" style={{ width: "1000px" }}>
    <h3 className="text-center rounded-pill border-bottom border-dark-subtle mt-1">New Order</h3>
    <table className="table">
      <thead>
        <tr>
          <th className="f">
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">Customer Name:</label>
              <input
                type="text"
                className="form-control"
                value={customerName}
                placeholder="Customer Name"
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="region" className="form-label">Region:</label>
              <select
                id="region"
                className="form-select"
                value={selectedRegion}
                onChange={handleRegionChange}
                required
              >
                <option value="" disabled>Select a region</option>
                {Object.keys(regionsData).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            {selectedRegion && (
              <div className="mb-3">
                <label htmlFor="city" className="form-label">City:</label>
                <select
                  id="city"
                  className="form-select"
                  value={customerAddress}
                  onChange={handleCityChange}
                  required
                >
                  <option value="" disabled>Select a city</option>
                  {regionsData[selectedRegion].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="deliveryDate" className="form-label">Delivery Date:</label>
              <input
                type="date"
                className="form-control"
                value={delivereyDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="selectedProduct" className="form-label">Select Product:</label>
              <select
                className="form-select"
                value={selectedProductId}
                onChange={handleProductChange}
              >
                <option value="" disabled>Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button type="button" onClick={handleAddProduct} className="btn btn-primary mb-3 w-100">Add </button>
          </th>
          <th className="selected">
            <div>
              <h3>Selected Products:</h3>
              <ul>
                {selectedProducts.map((product, index) => (
                  <li key={index} className="d-flex justify-content-between">
                  <div>
                    {products.find((p) => p._id === product.productId)?.name} - {product.quantity}
                  </div>
                  <button type="button" onClick={() => handleRemoveProduct(index)} className="btn btn-danger mb-2 ms-2">
                    Remove
                  </button>
                </li>
                ))}
              </ul>
            </div>
            <button type="submit" className="btn btn-success mb-3 w-100">Place Order</button>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</form>
  );
};

export default NewOrderForm;
