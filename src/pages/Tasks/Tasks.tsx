import React, { useEffect, useState } from 'react';
import {
  GridActionsCellItem,
  GridColumnHeaderParams,
  GridColumns,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import StyledDataGrid from '../../components/StyledDataGrid';
import CustomPagination from '../../components/Pagination';
import CustomNoRowsOverlay from '../../components/CustomNoRowsOverlay';
import './tasks.css';
import Content from '../../components/Content';
import TaskCreation from '../../features/TaskCreation/TaskCreation';
import { useNavigate } from 'react-router-dom';
import TaskEdit from '../../features/TaskEdit/TaskEdit';
import DeleteConfirmation from './DeleteTask/DeleteConfirmation';
import config from '../../config';

interface User {
  id: Number;
  name: String;
}

interface Category {
  id: Number;
  name: String;
}

interface Answer {
  id: Number;
  text: String;
  correct: boolean;
}

interface FullTaskData {
  id: Number;
  title: String;
  description: String;
  summary: String;
  creationDate: Date;
  score: Number;
  user: User;
  category: Category;
  answers: Answer[];
  voted: boolean;
}

interface TaskData {
  id: Number;
  title: String;
  description: String;
  summary: String;
  creationDate: Date;
  score: Number;
  author: String;
  category: Category;
  voted: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [showModal, setShow] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(0);

  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);

  useEffect(() => {
    fetch(config.backendURL + '/tasks/', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((data: TaskData[]) => {
        if (data.length !== 0) {
          data = data.map((t) => ({
            ...t,
            summary: t.summary == null || t.summary === '' ? formatDescription(t.description) : t.summary,
          }));
        }
        setTasks(data);
      });
  }, []);

  const handleAdd = (event: any, task: any) => {
    const tasksCopy = [...tasks];
    task.summary = task.summary == null || task.summary === '' ? formatDescription(task.description) : task.summary;
    tasksCopy.push(task);
    setTasks(tasksCopy);
  };

  const handleDelete = (id: any) => {
    const url = config.backendURL + '/tasks/' + id;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      method: 'DELETE',
      mode: 'cors',
    }).then(() => {
      fetch(config.backendURL + '/tasks/', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return [];
          }
        })
        .then((data: TaskData[]) => {
          if (data.length !== 0) {
            data = data.map((t) => ({
              ...t,
              summary: t.summary == null || t.summary === '' ? formatDescription(t.description) : t.summary,
            }));
          }
          setTasks(data);
        });
    });
  };

  const handleLike = (id: any, voted: boolean) => {
    const url = config.backendURL + '/vote/' + id;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
      },
      method: voted ? 'DELETE' : 'POST',
      mode: 'cors',
    }).then(() => {
      fetch(config.backendURL + '/tasks/', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return [];
          }
        })
        .then((data: TaskData[]) => {
          if (data.length !== 0) {
            data = data.map((t) => ({
              ...t,
              summary: t.summary == null || t.summary === '' ? formatDescription(t.description) : t.summary,
            }));
          }
          setTasks(data);
        });
    });
  };

  const formatDescription = (description: String) => {
    return description.length > 100 ? description.substring(0, 97) + '...' : description;
  };
  const handleModify = (task: FullTaskData) => {
    let tempTasks = [...tasks];
    const taskToUpdate = tempTasks.find((t) => t.id === task.id);

    if (taskToUpdate !== undefined) {
      taskToUpdate.author = task.user.name;
      taskToUpdate.id = task.id;
      taskToUpdate.title = task.title;
      taskToUpdate.description = task.description;
      taskToUpdate.summary = formatDescription(task.summary);
      taskToUpdate.creationDate = task.creationDate;
      taskToUpdate.score = task.score;
      taskToUpdate.category = task.category;
    }

    setTasks(tempTasks);
  };

  const columns: GridColumns = [
    {
      field: 'score',
      type: 'number',
      renderHeader: (params: GridColumnHeaderParams) => <ThumbUpIcon />,
      flex: 1,
      minWidth: 70,
      headerAlign: 'left',
      align: 'left',
    },
    { field: 'title', headerName: 'Title', flex: 2, headerAlign: 'left', align: 'left', minWidth: 100 },
    {
      field: 'category',
      headerName: 'Category',
      valueGetter: (params: GridValueGetterParams) => params.row.category.name,
      flex: 2,
      headerAlign: 'left',
      align: 'left',
    },
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
      field: 'author',
      headerName: 'Creator',
      sortable: false,
      flex: 1.5,
      headerAlign: 'left',
      align: 'left',
      minWidth: 95,
    },
    {
      field: 'creationDate',
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
          icon={params.row.voted ? <ThumbUpIcon style={{ backgroundColor: 'white' }} /> : <ThumbUpIcon />}
          disabled={sessionStorage.getItem('token') === ''}
          hidden={sessionStorage.getItem('token') === ''}
          onClick={() => handleLike(params.id, params.row.voted)}
          label="Like"
        />,
        <GridActionsCellItem
          className="task-action-button"
          icon={<VisibilityIcon />}
          onClick={() => navigate('/task/' + params.id)}
          label="View"
        />,
        <GridActionsCellItem
          className="task-action-button"
          icon={<EditIcon />}
          onClick={() => {
            setSelectedTask(params.id as number);
            setShowModifyModal(true);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          className="task-action-button"
          icon={<DeleteIcon />}
          onClick={() => {
            setDeleteId(Number(params.id));
            setShowDelete(true);
          }}
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
      <TaskEdit
        show={showModifyModal}
        close={() => {
          setShowModifyModal(false);
        }}
        handleModify={handleModify}
        id={selectedTask}
      />
      <TaskCreation
        show={showModal}
        close={() => {
          setShow(false);
        }}
        handleAdd={handleAdd}
      />
      <DeleteConfirmation
        show={showDelete}
        close={() => {
          setShowDelete(false);
        }}
        handleDelete={handleDelete}
        id={deleteId}
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
          rows={tasks}
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            noRowsOverlay: { message: 'No tasks yet!' },
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
