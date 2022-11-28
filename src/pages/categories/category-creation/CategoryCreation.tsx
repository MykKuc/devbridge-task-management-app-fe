import React from 'react';
import EmptyModal from '../../../components/EmptyModal';

interface Props {
  show: boolean;
  close: () => void;
  handleAdd: any;
}

const CategoryCreation = (props: Props) => {
  return (
    <>
      <EmptyModal show={props.show} close={props.close} title="Create Category"></EmptyModal>
    </>
  );
};

export default CategoryCreation;
