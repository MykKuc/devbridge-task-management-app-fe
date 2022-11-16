import React from 'react';
import EmptyModal from '../../Components/EmptyModal';
import TaskCreationForm from './TaskCreationForm';

const TaskCreation = (setShow: any) => {
  return (
    <>
      <EmptyModal setShow={setShow} title="Create task">
        <div className="outer-div">
          <TaskCreationForm />
        </div>
      </EmptyModal>
    </>
  );
};

export default TaskCreation;
