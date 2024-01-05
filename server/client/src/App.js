import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import StockPage from './components/stock/productsIn/StockPage';
import MainPage from './components/stock/products/MainPage';

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
              element={isLoggedIn ? <Navigate to="/main" /> : <LoginPage setisLoggedIn={setisLoggedIn} />}
            />
            {isLoggedIn && (
              <>
                <Route path="/main" element={<MainPage />} />
                <Route path="/stock" element={<StockPage />}  />
              </>
            )}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
