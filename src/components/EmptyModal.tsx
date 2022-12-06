import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Content from './Content';
import './EmptyModal.css';

interface Props {
  show: boolean;
  close?: () => void;
  title: string;
  children: any;
  bootstrapColumnBreaks: string;
  height: string;
}

export default function EmptyModal(props: Props) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={props.show}
      onClose={props.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Content
          styleClasses="empty-modal"
          height={props.height}
          bootstrapColumnBreaks={props.bootstrapColumnBreaks}
          name={props.title}
          closeButtonClick={props.close}
        >
          {props.children}
        </Content>
      </div>
    </Modal>
  );
}

EmptyModal.defaultProps = {
  bootstrapColumnBreaks: undefined,
  height: undefined,
};
