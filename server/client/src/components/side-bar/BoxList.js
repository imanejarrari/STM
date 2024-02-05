import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Badge from "@mui/material/Badge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faXmark } from '@fortawesome/free-solid-svg-icons';
import "./Sidebar.css";

export default function BoxList({ onLogOut }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [ProductData, setProductData] = useState([]);
  const [countValue, setCountValue] = useState(0);

  const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/productlist');
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (e) => {
    e.stopPropagation();
    setOpenDialog(false);
  };

  const notificationCount = ProductData.reduce((count, product) => {
    if (product.quantityInStock === 0 || product.quantityInStock < 50) {
      return count + 1;
    }
    return count;
  }, 0);
   
  

  useEffect(() => {
    setCountValue(notificationCount);
    fetchProductData();
  }, [notificationCount]);
  

  return (
    <>
      <Box sx={{ width: '200px', bgcolor: '#cfcfcf', zIndex: '100', borderRadius: '20px', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation() }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding >
              <ListItemButton onClick={handleOpenDialog}>
                <ListItemIcon>
                <Badge badgeContent={countValue} color="error">
                  <CircleNotificationsIcon style={{ color: 'white' }} />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={"Inbox"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onLogOut}>
              <ListItemButton>
                <ListItemIcon>
                  <MeetingRoomIcon style={{ color: 'white' }} />
                </ListItemIcon >
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}  fullWidth="500px">
        <DialogTitle ><u><b>Notification:</b></u></DialogTitle>
        <DialogContent>
        <DialogContentText>
        {ProductData.map((product) => {
            if (product.quantityInStock === 0) {
              return (
                <div key={product.id}>
                  <p className='border-bottom border-dark-subtle labelDesign p-2'>
                    <FontAwesomeIcon icon={faXmark} className='mx-2' color='red'/>
                    Product <span style={{ color: 'red', fontWeight:"bolder"}}>{product.name}</span> is Out Of Stock.
                  </p>
                </div>
              );
            } else if (product.quantityInStock < 50) {
              return (
                <div key={product.id} >
                  <p className='border-bottom border-dark-subtle labelDesign p-2 '>
                   <FontAwesomeIcon icon={faWarning} className='mx-2' color='orange' />
                    Product <span style={{ color: 'orange',  fontWeight:"bolder"}}>{product.name}</span> is Close To End Up.
                  </p>
                </div>
              );
            }
            return null;
          })}
          {ProductData.length === 0 && <p>No specific notification for this product.</p>}
      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
