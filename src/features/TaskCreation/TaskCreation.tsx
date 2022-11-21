import React from 'react';
import EmptyModal from '../../Components/EmptyModal';
import TaskCreationForm from './TaskCreationForm';
interface Props {
  setShow: any;
  handleAdd: any;
}
const TaskCreation = (props: Props) => {
  const { setShow, handleAdd } = props;
  return (
    <>
      <EmptyModal setShow={setShow} title="Create task">
        <div className="outer-div">
          <TaskCreationForm handleAdd={handleAdd} />
        </div>
      </EmptyModal>
    </>
  );
};

export default TaskCreation;
