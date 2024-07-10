import React from 'react';
import { CheckCircleOutline as SuccessIcon, Close as CloseIcon } from '@mui/icons-material';
import { Snackbar, IconButton } from '@mui/material';
const SuceessSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      message={
        <span style={{ display: 'flex', alignItems: 'center', zIndex: 100 }}>
          <SuccessIcon style={{ marginRight: '8px', color: 'green' }} />
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

export default SuceessSnackbar;
