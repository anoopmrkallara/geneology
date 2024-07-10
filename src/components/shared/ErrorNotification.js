import React from 'react';
import { ErrorOutline as ErrorIcon, Close as CloseIcon } from '@mui/icons-material';
import { Snackbar, IconButton } from '@mui/material';

const ErrorSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      style={{ zIndex: 100 }} // Move zIndex to the Snackbar component
      message={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <ErrorIcon style={{ marginRight: '8px', color: 'red' }} />
          {message}
        </span>
      }
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default ErrorSnackbar;
