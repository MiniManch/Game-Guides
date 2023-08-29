import { useEffect, useState } from 'react';
import { Snackbar, Button } from '@mui/material';

const SuccessPopup = ({ open, onClose, timeout, style }) => {
  const [showManualButton, setShowManualButton] = useState(false);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowManualButton(true); // Show the manual button after the autoHideDuration
        onClose();
      }, timeout); 
    }
  }, [open, onClose, timeout]);

  const handleManualClose = () => {
    setShowManualButton(false);
    handleClose();
  };

  return (
    <>
      {showManualButton && <Button onClick={handleManualClose}>Show Message Manually</Button>}

      <Snackbar
        open={open}
        autoHideDuration={timeout} 
        onClose={handleClose}
        message="Logged in successfully!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={style} // Apply custom styles
      />
    </>
  );
};

export default SuccessPopup;
