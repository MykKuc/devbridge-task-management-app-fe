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
      <EmptyModal
        show={props.show}
        close={props.close}
        title="Create Cateogry"
        height="40vh"
        bootstrapColumnBreaks="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-sm-11 col-12"
      >
        <CategoryCreationForm handleAdd={props.handleAdd} close={props.close} />
      </EmptyModal>
    </>
  );
};

export default CategoryCreation;
