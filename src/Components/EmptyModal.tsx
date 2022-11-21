import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ReactNode, useState } from 'react';
import './EmptyModal.css';

export default function EmptyModal({ opens, title, children }: any) {
  const [open, setOpen] = useState(true);
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
        <Box className="empty-modal">
          <Button onClick={handleClose} className="modal-close-button">
            <p className="modal-close-button-text">X</p>
          </Button>

          <Box className="modal-header">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              className="modal-header-hidden"
            >
              .
            </Typography>
          </Box>
          <h2 className="modal-header-text">{title}</h2>

          {children}
        </Box>
      </Modal>
    </div>
  );
}
