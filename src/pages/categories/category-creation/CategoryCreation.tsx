import React from 'react';
import EmptyModal from '../../../components/EmptyModal';
import CategoryCreationForm from './CategoryCreationForm';

interface Props {
  show: boolean;
  close: () => void;
  handleAdd: any;
}

const CategoryCreation = (props: Props) => {
  return (
    <>
      <EmptyModal show={props.show} close={props.close} title="Create Category">
        <div>
          <CategoryCreationForm handleAdd={props.handleAdd} close={props.close} />
        </div>
      </EmptyModal>
    </>
  );
};

export default CategoryCreation;
