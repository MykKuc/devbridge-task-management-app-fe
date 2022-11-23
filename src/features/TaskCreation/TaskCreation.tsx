import React from 'react';
import EmptyModal from '../../components/EmptyModal';
import TaskCreationForm from './TaskCreationForm';
interface Props {
  show: boolean;
  close: () => void;
  handleAdd: any;
}
const TaskCreation = (props: Props) => {
  return (
    <>
      <EmptyModal show={props.show} close={props.close} title="Create task">
        <div className="outer-div">
          <TaskCreationForm handleAdd={props.handleAdd} close={props.close} />
        </div>
      </EmptyModal>
    </>
  );
};

export default TaskCreation;
