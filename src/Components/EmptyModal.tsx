import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ReactNode, useState } from 'react';
import './Modal.css';

interface Props {
  show: boolean;
  close?: () => void;
  title: string;
  children: any;
}

export default function EmptyModal(props: Props) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="empty-modal">
          <Button onClick={props.close} className="modal-close-button">
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
          <h2 className="modal-header-text">{props.title}</h2>

          {props.children}
        </Box>
      </Modal>
    </div>
  );
}
