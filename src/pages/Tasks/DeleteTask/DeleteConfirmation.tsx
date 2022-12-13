import EmptyModal from '../../../components/EmptyModal';
import React from 'react';
import DeleteConfirmationForm from './DeleteConfirmationForm';
import './DeleteConfirmation.css';

interface Props {
  show: boolean;
  close: () => void;
  handleDelete: any;
  id: number;
}

const DeleteConfirmation = (props: Props) => {
  return (
    <>
      <EmptyModal
        show={props.show}
        close={props.close}
        title="Confirm deletion"
        height="30vh"
        bootstrapColumnBreaks="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-sm-11 col-12"
      >
        <DeleteConfirmationForm handleDelete={props.handleDelete} close={props.close} id={props.id} />
      </EmptyModal>
    </>
  );
};

export default DeleteConfirmation;
