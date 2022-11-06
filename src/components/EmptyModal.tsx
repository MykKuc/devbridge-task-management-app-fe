import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  bgcolor: '#383838',
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
};

const styleheader = {
    position: 'absolute' as 'absolute',
    bgcolor: '#2BABD3',
    top: 0,
    width: '100%',
    left: 0,
    border: 0,
    borderRadius: 7,
    textAlign: 'center',
    fontFamily: 'Inter',
    color: 'white',
    fontWeight: 'Bold'
}

const closebutton = {
    color: 'white',
    position: 'absolute' as 'absolute',
    right: '0px',
    top: '-5px',
    fontSize: '20px',
    zIndex: '3',
    fontFamily: 'Inter',
    fontWeight: '900'
}

const mainmodalbody = {
    color: '#2BABD3',
    fontFamily: 'Inter'
}

export default function EmptyModal() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Empty Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Button onClick={handleClose} sx={closebutton}>X</Button>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={styleheader} >
            Text of the header
          </Typography>

          <Typography id="modal-modal-description" sx={mainmodalbody}>
            This is some content or Text inside the modal.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}