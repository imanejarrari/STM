import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import StockPage from './components/stock/productsIn/StockPage';
import MainPage from './components/stock/products/MainPage';
import MainOrder from './components/orders/allOrders/orderMain';
import MainSupp from './components/Suppliers/MainSupp';
import NewOrderPage from './components/orders/NewOrder/NewOrderpage';



function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setisLoggedIn(true);
    }
  }, []);

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/productlist" /> : <LoginPage setisLoggedIn={setisLoggedIn} />}
            />
            {isLoggedIn && (
              <>
                <Route path="/productlist" element={<MainPage />} />
                <Route path="/stock" element={<StockPage />}  />
                <Route path='/orders' element={<MainOrder /> } />
                <Route path='/productsBySupplier' element={<MainSupp /> } />
                <Route path='/placeOrder' element={<NewOrderPage/>} />
               
               
        

                
               
                
              </>
            )}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
