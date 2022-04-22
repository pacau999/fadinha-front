import { Box, Paper, Modal as MuiModal, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

const Modal = ({ open, onClose, children, ...props }) => {
  const [vh, setVh] = useState(window.innerHeight);
  const checkAndUpdateVh = function () {
    let newVh = window.innerHeight;
    if (vh !== newVh) {
      setVh(newVh);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', checkAndUpdateVh);
    return function cleanUp() {
      window.removeEventListener('resize', checkAndUpdateVh);
    };
  }, []);
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    >
      <Box
        component={Paper}
        width={'max-content'}
        minWidth={'280px'}
        maxHeight={vh}
        style={{ overflowY: 'auto' }}
      >
        <Box style={{ float: 'right' }}>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
        {open && children}
      </Box>
    </MuiModal>
  );
};
export default Modal;
