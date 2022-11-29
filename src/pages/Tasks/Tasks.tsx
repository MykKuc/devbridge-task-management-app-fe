import React, { useMemo, useState } from 'react';
import { GridActionsCellItem, GridColumnHeaderParams, GridColumns, GridRowParams } from '@mui/x-data-grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import StyledDataGrid from '../../Components/StyledDataGrid';
import CustomPagination from '../../Components/Pagination';
import GetTasks from './GetTasks';
import './tasks.css';
import Content from '../../Components/Content';
import TaskCreation from '../../features/TaskCreation/TaskCreation';
import { useNavigate } from 'react-router-dom';
import TaskEdit from '../../features/menu/Task Edit/TaskEdit';

function Tasks() {
  const [tasksRes, setTasksRes] = useState(GetTasks());
  const [showModal, setShow] = useState(false);
  const navigate = useNavigate();

  const tasksData = useMemo(
    () =>
      tasksRes.map((t) => ({
        ...t,
        summary: t.summary == null ? t.description.substring(0, 47) + '...' : t.summary,
        actions: null,
      })),
    [tasksRes]
  );

  const handleAdd = (event: any, task: any) => {
    const TasksResCopy = [...tasksRes];
    TasksResCopy.push(task);
    setTasksRes(TasksResCopy);
    console.log(tasksRes);
  };
  const handleModify = (task: any) => {
    let tasksResCopy = [...tasksRes];
    for (let i = 0; i < tasksResCopy.length; i++) {
      if (tasksResCopy[i].id === task.id) {
        console.log('identical found.');
        tasksResCopy[i] = task;
        break;
      }
    }
    setTasksRes(tasksResCopy);
    console.log('end');
  };

  const columns: GridColumns = [
    {
      field: 'votes',
      type: 'number',
      renderHeader: (params: GridColumnHeaderParams) => <ThumbUpIcon />,
      flex: 1,
      minWidth: 70,
      headerAlign: 'left',
      align: 'left',
    },
    { field: 'title', headerName: 'Title', flex: 2, headerAlign: 'left', align: 'left', minWidth: 100 },
    { field: 'category', headerName: 'Category', flex: 2, headerAlign: 'left', align: 'left' },
    {
      field: 'summary',
      headerName: 'Description',
      sortable: false,
      flex: 3,
      headerAlign: 'left',
      align: 'left',
      minWidth: 160,
    },
    {
      field: 'creator',
      headerName: 'Creator',
      sortable: false,
      flex: 1.5,
      headerAlign: 'left',
      align: 'left',
      minWidth: 95,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
      minWidth: 95,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          className="task-action-button"
          icon={<ThumbUpIcon />}
          onClick={() => console.log(`Like task with id ${params.id}`)}
          label="Like"
        />,
        <GridActionsCellItem
          className="task-action-button"
          icon={<VisibilityIcon />}
          onClick={() => navigate('/task/' + params.id)}
          label="View"
        />,
        <TaskEdit id={params.id as number} isInList={true} handleModify={handleModify} />,
        <GridActionsCellItem
          className="task-action-button"
          icon={<DeleteIcon />}
          onClick={() => console.log(`Delete task with id ${params.id}`)}
          label="Delete"
        />,
      ],
      sortable: false,
      flex: 1.5,
      minWidth: 180,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  return (
    <Content name={'Tasks'}>
      <TaskCreation
        show={showModal}
        close={() => {
          setShow(false);
        }}
        handleAdd={handleAdd}
      />
      <div className="button-wrapper">
        <button
          className="button-primary"
          onClick={() => {
            setShow(true);
          }}
        >
          Create
        </button>
      </div>
      <div className="tasks-table-wrapper">
        <StyledDataGrid
          headerHeight={70}
          rowHeight={60}
          autoPageSize
          disableColumnMenu
          disableSelectionOnClick
          columns={columns}
          rows={tasksData}
          components={{
            Pagination: CustomPagination,
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'votes', sort: 'desc' }],
            },
          }}
        />
      </div>
    </Content>
  );
}

export default Tasks;
