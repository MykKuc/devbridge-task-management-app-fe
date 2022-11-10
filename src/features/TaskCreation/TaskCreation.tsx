import React from 'react';
import EmptyModal from '../../components/EmptyModal';
import TaskCreationForm from './TaskCreationForm';

const TaskCreation = () => {
  return (
    <>
      <EmptyModal title="Create task">
        <div id="outer-div">
          <TaskCreationForm />
        </div>
      </EmptyModal>
    </>
  );
};

export default TaskCreation;
