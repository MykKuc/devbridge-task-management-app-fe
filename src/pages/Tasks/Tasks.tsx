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
}

interface Category {
  id: Number;
  name: String;
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
}

function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [showModal, setShow] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks/')
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

  const formatDescription = (description: String) => {
    return description.length > 100 ? description.substring(0, 97) + '...' : description;
  };
  const handleModify = (task: FullTaskData) => {
    let tempTasks = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
      if (tempTasks[i].id === task.id) {
        tempTasks[i].author = task.user.name;
        tempTasks[i].id = task.id;
        tempTasks[i].title = task.title;
        tempTasks[i].description = task.description;
        tempTasks[i].summary = formatDescription(task.summary);
        tempTasks[i].creationDate = task.creationDate;
        tempTasks[i].score = task.score;
        tempTasks[i].category = task.category;

        setTasks(tempTasks);
        break;
      }
    }
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
