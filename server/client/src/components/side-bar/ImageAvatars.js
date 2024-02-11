import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import BoxList from './BoxList';
import Badge from '@mui/material/Badge';


function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#d3d3d3',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function ImageAvatars() {
  const userName = localStorage.getItem('userName');
  const [displayBoxList, setDisplayBoxList] = useState(false);
  const [countValue, setCountValue] = useState(0);
  const [ProductData, setProductData] = useState([])

  const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/productlist');
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const notificationCount = ProductData.reduce((count, product) => {
    if (product.quantityInStock === 0 || product.quantityInStock < 10) {
      return count + 1;
    }
    return count;
  }, 0);
   
  

  useEffect(() => {
    setCountValue(notificationCount);
    fetchProductData();
  })

  const LogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block',cursor:'pointer' }}>
      {!displayBoxList && 
        <Badge badgeContent={countValue} color='error' >
          <Avatar {...stringAvatar(userName)} onClick={onAvatareClick => setDisplayBoxList(!displayBoxList)} />
        </Badge>
      }
        {displayBoxList && 
        <>       
          <Avatar {...stringAvatar(userName)} onClick={onAvatareClick => setDisplayBoxList(!displayBoxList)} />   
          <div style={{ position: 'absolute', top: '-275%', left: '50%', zIndex: '1000'}}>
            <BoxList onLogOut={LogOut}/>
          </div>
        </>
        }
        
    </div>
  );
}
