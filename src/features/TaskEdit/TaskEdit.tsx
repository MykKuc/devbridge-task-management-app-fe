import React, { useEffect, useState } from 'react';
import EmptyModal from '../../components/EmptyModal';
import TaskEditForm from './TaskEditForm';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import './TaskEdit.css';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Content from '../../components/Content';

interface Props {
  show: boolean;
  close: () => void;
  handleModify: any;
  id: number;
}
export default function TaskEdit(props: Props) {
  return (
    <>
      <EmptyModal show={props.show} close={props.close} title="Change task">
        <div className="outer-div">
          <TaskEditForm handleModify={props.handleModify} close={props.close} id={props.id} />
        </div>
      </EmptyModal>
    </>
  );
}
