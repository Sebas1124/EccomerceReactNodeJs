import React, { useState } from 'react'
import { Modal, Typography } from '@mui/material';
import  Box  from '@mui/material/Box';

export const ModalComponent = ({ isOpen, product }) => {



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {

  }

  return (
    <Modal
        open={ isOpen }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Editar { product.Nombre }
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        </Box>
    </Modal>
  )
}
