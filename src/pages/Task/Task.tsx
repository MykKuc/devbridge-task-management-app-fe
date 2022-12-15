import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './Task.css';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../components/Content';
import TaskEdit from '../../features/TaskEdit/TaskEdit';
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

const Task = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskData>();
  const [showModifyModal, setShowModifyModal] = useState(false);

  const url = config.backendURL + '/tasks/' + params.id;

  const handleModify = (newTask: TaskData) => {
    setTask(newTask);
  };
  const taskName = task?.title ?? 'Task';
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
        setTask(data);
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
              <div style={{ color: 'white' }}>
                <ThumbUpIcon />
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
                  onClick={() => setShowModifyModal(true)}
                >
                  {' '}
                  Edit
                </button>

                <button type="button" className=" btn btn-danger rounded-pill" style={{ width: '100px' }}>
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
