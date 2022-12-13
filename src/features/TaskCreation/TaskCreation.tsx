import React from 'react';
import EmptyModal from '../../components/EmptyModal';
import TaskCreationForm from './TaskCreationForm';
interface Props {
  show: boolean;
  close: () => void;
  setListChanged: Function;
}
const TaskCreation = (props: Props) => {
  return (
    <>
      <EmptyModal
        show={props.show}
        close={props.close}
        title="Create Task"
        height="70vh"
        bootstrapColumnBreaks="col-xxl-6 col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12"
      >
        <TaskCreationForm setListChanged={props.setListChanged} close={props.close} />
      </EmptyModal>
    </>
  );
};

export default TaskCreation;
