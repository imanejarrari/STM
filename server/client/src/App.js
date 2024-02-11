import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import StockPage from './components/stock/productsIn/StockPage';
import MainPage from './components/stock/products/MainPage';
import ExeclPage from './components/ExcelFile/ExcelPage';
import MainSupp from './components/suppliers/MainSupp';
import MainOrder from './components/orders/allOrders/orderMain';
import NewOrder from './components/orders/NewOrder/NewOrderMain';
import Details from './components/orders/NewOrder/DetailsMain';
import MainDash from './components/dashboard/mainDash';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setisLoggedIn(true);
    }
  }, []);

  return (
    <>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/main" /> : <LoginPage setisLoggedIn={setisLoggedIn} />}
              />
              {isLoggedIn && (
                <>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/stock" element={<StockPage />}  />
                    <Route path="/convertExcel" element={<ExeclPage />}  />
                    <Route path="/suppliers" element={<MainSupp />} />
                    <Route path="/stock" element={<StockPage />}  />
                    <Route path='/allOrders' element={<MainOrder /> } />
                    <Route path='/productsBySupplier' element={<MainSupp /> } />
                    <Route path='/placeOrder' element={<NewOrder/>} />
                    <Route path='/orderDetails/:orderId' element={<Details/>} />
                    <Route path='/dashboard' element={<MainDash/>} />
                
                </>
              )}
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
