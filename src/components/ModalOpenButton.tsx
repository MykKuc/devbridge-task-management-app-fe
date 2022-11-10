import React from 'react';
import EmptyModal from './EmptyModal';

const ModalOpenButton = () => {
  return (
    <>
      <EmptyModal children={<div>Empty</div>} />
    </>
  );
};

export default ModalOpenButton;
