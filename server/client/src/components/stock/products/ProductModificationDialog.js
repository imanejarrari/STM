import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}));

const ProductModificationDialog = ({showModal,selectedProduct, onSaveChanges }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierContactInfo, setSupplierContactInfo] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.name || '');
      setProductDescription(selectedProduct.description || '');
      setProductCategory(selectedProduct.category || '');
      setProductBrand(selectedProduct.brand || '');
      setSupplierName(selectedProduct.supplierName || '');
      setSupplierContactInfo(selectedProduct.supplierContactInfo || '');
      setCostPrice(selectedProduct.costPrice || '');
      setSellingPrice(selectedProduct.sellingPrice || '');
      setQuantityInStock(selectedProduct.quantityInStock || '');
    }
  }, [selectedProduct]);

  useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  const handleSaveChanges = () => {
    const updatedProduct = {
      _id: selectedProduct._id,
      name: productName,
      description: productDescription,
      category: productCategory,
      brand: productBrand,
      supplierName: supplierName,
      supplierContactInfo: supplierContactInfo,
      costPrice: costPrice,
      sellingPrice: sellingPrice,
      quantityInStock: quantityInStock,

    };
    axios
      .put('http://localhost:5000/api/products/updateproduct', updatedProduct)
      .then((response) => {
        setOpen(false);
        onSaveChanges(response.data);
      })
      .catch((error) => {
        console.error('Error updating product:', error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ color: 'white', bgcolor: 'primary.main', ":hover": { boxShadow: 6, bgcolor: "info.main", } }}>
        Modify Product
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="product-modification-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="product-modification-dialog-title">
          Modify Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            label="Product Name"
            fullWidth
            value={productName}
            style={{padding:"26px"}}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            style={{padding:"26px"}}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <TextField
            label="Category"
            fullWidth
            style={{padding:"26px"}}
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
          <TextField
            label="Brand"
            fullWidth
            style={{padding:"26px"}}
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          />
          <TextField
            label="Supplier Name"
            fullWidth
            style={{padding:"26px"}}
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
          <TextField
            label="Supplier Contact Info"
            fullWidth
            style={{padding:"26px"}}
            value={supplierContactInfo}
            onChange={(e) => setSupplierContactInfo(e.target.value)}
          />
          <TextField
            label="Cost Price"
            fullWidth
            type="number"
            style={{padding:"26px"}}
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
          <TextField
            label="Selling Price"
            fullWidth
            type="number"
            style={{padding:"26px"}}
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
          <TextField
            label="Quantity In Stock"
            fullWidth
            style={{padding:"26px"}}
            type="number"
            value={quantityInStock}
            onChange={(e) => setQuantityInStock(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ProductModificationDialog;
