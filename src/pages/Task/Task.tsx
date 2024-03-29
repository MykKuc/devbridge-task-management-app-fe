import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './Task.css';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../components/Content';
import TaskEdit from '../../features/TaskEdit/TaskEdit';
import config from '../../config';
import { IconButton } from '@mui/material';

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
  voted: boolean;
  isDisabled: boolean;
}

const Task = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskData>();
  const [showModifyModal, setShowModifyModal] = useState(false);

  const url = config.backendURL + '/tasks/' + params.id;

  const handleModify = (newTask: TaskData) => {
    const updateTaskRequest = {
      id: newTask.id,
      title: newTask.title,
      categoryId: newTask.category.id,
      description: newTask.description,
      answers: newTask.answers,
      summary: newTask.summary,
    };

    const url = config.backendURL + '/tasks/' + task?.id;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
      },
      body: JSON.stringify(updateTaskRequest),
    }).then(() => {
      const url = config.backendURL + '/tasks/' + params.id;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            navigate('/*');
          }
        })
        .then((data) => {
          const updatedData = {
            ...data,
            isDisabled:
              sessionStorage.getItem('current_user') !== data.user.name &&
              sessionStorage.getItem('current_user_role') !== 'ADMIN',
          };
          setTask(updatedData);
        });
    });
  };

  const handleLike = () => {
    const url = config.backendURL + '/vote/' + task?.id;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
      },
      method: task?.voted ? 'DELETE' : 'POST',
      mode: 'cors',
    }).then(() => {
      const url = config.backendURL + '/tasks/' + params.id;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            navigate('/*');
          }
        })
        .then((data) => {
          const updatedData = {
            ...data,
            isDisabled:
              sessionStorage.getItem('current_user') !== data.user.name &&
              sessionStorage.getItem('current_user_role') !== 'ADMIN',
          };
          setTask(updatedData);
        });
    });
  };

  const taskName = task?.title ?? 'Task';
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          navigate('/*');
        }
      })
      .then((data) => {
        const updatedData = {
          ...data,
          isDisabled:
            sessionStorage.getItem('current_user') !== data.user.name &&
            sessionStorage.getItem('current_user_role') !== 'ADMIN',
        };
        setTask(updatedData);
      });
  }, []);
  return (
    <>
      <Content name={taskName}>
        <div className="row">
          <div className="col-lg-7 text-start ">
            <label> Summary</label>
            <div className="separation " />
            <div className="overflow-auto " style={{ height: '100px' }}>
              <p className="text-start"> {task?.summary}</p>
            </div>
            <div>
              <label> Description</label>
              <div className="separation" />
              <div className="overflow-auto " style={{ height: '100px' }}>
                <p className="text-start overflow-auto"> {task?.description} </p>
              </div>
            </div>
            <div>
              <label style={{ paddingTop: '10px' }}> Answer </label>
              <div className="separation" />
              <div className="overflow-auto " style={{ height: '100px' }}>
                {task?.answers.map((answer: Answer) => {
                  if (task?.answers.length === 1) {
                    return (
                      <p key={answer.id.toString()} style={{ color: '#2babd3' }}>
                        {answer.text}
                      </p>
                    );
                  } else if (answer.correct) {
                    return (
                      <p key={answer.id.toString()} style={{ color: '#2babd3' }}>
                        {answer.text}{' '}
                      </p>
                    );
                  } else return <p key={answer.id.toString()}> {answer.text}</p>;
                })}
              </div>
            </div>
          </div>
          <div
            className="col align-middle"
            style={{
              marginRight: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="row justify-content-center text-center" style={{ width: '250px' }}>
              <div>
                <IconButton disabled={sessionStorage.getItem('token') === ''} onClick={() => handleLike()}>
                  {task?.voted ? (
                    <ThumbUpIcon style={{ color: '#2babd3' }} />
                  ) : (
                    <ThumbUpIcon style={{ color: 'white' }} />
                  )}
                </IconButton>
              </div>
              <p style={{ textAlign: 'center' }}>{task?.score.toString()}</p>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between">
                <label>Task author</label>

                <p>{task?.user.name}</p>
              </div>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between">
                <label>Date of creation</label>

                <p>{task?.creationDate.toString().split('T')[0]}</p>
              </div>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between ">
                <label>Category</label>

                <p>{task?.category.name}</p>
              </div>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between py-1 ">
                <button
                  type="button"
                  className=" btn btn-primary rounded-pill "
                  style={{ width: '100px' }}
                  onClick={() => {
                    setShowModifyModal(true);
                  }}
                  disabled={task?.isDisabled}
                >
                  {' '}
                  Edit
                </button>

                <button
                  type="button"
                  className=" btn btn-danger rounded-pill"
                  style={{ width: '100px' }}
                  disabled={task?.isDisabled}
                >
                  {' '}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <TaskEdit
          show={showModifyModal}
          close={() => {
            setShowModifyModal(false);
          }}
          handleModify={handleModify}
          id={params.id !== undefined ? parseInt(params.id) : 0}
        />
      </Content>
    </>
  );
};

export default Task;
