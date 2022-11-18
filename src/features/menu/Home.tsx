import React from 'react';
import Content from '../../Components/Content';
import ModalOpenButton from '../../Components/ModalOpenButton';
import {useDispatch} from "react-redux";
import {createTask, updateTask, removeTask} from "../../redux/actions/taskActions";





function Home() {

  // const dispatch=useDispatch();
  // dispatch(createTask());
  return (
    <Content name={'Home'} height={'60vh'}>
      <span>Hello world </span>
      <ModalOpenButton></ModalOpenButton>
    </Content>
  );
}

export default Home;
