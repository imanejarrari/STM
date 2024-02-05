import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}));

export default function ProductModificationDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ color:'white', bgcolor: 'primary.main',":hover":
       {boxShadow: 6,bgcolor:"info.main",}, 
      }}>
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
            // You can add state and handle changes accordingly
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            // You can add state and handle changes accordingly
          />
          {/* Add more fields as needed for product modification */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
