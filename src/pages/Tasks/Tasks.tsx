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
import taskJsonData from './tasks.json';

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

interface TaskData {
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
  const handleModify = (task: any) => {
    let tasksResCopy = [...tasksRes];
    for (let i = 0; i < tasksResCopy.length; i++) {
      if (tasksResCopy[i].id === task.id) {
        console.log('identical found.');
        task.creator = task.creator.name;
        task.category = task.category.name;
        tasksResCopy[i] = task;
        break;
      }
    }
    setTasksRes(tasksResCopy);
    console.log('end');
  };

  const getMockData = (taskId: number) => {
    const task = taskJsonData && taskJsonData.find((e) => e.id === Number(taskId));
    const answers = task?.answer;
    let convertedAnswers: Answer[] = [];
    if (answers !== undefined) {
      for (let i = 0; i < answers?.length; i++) {
        convertedAnswers.push({
          id: answers[i].id as Number,
          text: answers[i].text as String,
          correct: answers[i].isCorrect,
        });
      }
    }
    let convertedTask: TaskData = {
      id: task?.id as Number,
      title: task?.title as String,
      description: task?.description as String,
      summary: task?.summary as String,
      creationDate: new Date(task?.date !== undefined ? task.date : ''),
      score: task?.votes as Number,
      user: { id: -1, name: task?.creator as String },
      category: { id: -2, name: task?.category as String },
      answers: convertedAnswers,
    };

    return convertedTask;
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
        <TaskEdit
          id={params.id as number}
          isInList={true}
          handleModify={handleModify}
          task={getMockData(params.id as number)}
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
