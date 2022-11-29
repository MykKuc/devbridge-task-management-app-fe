import React, { useState, useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './Task.css';
import jsonData from '../Tasks/tasks.json';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../Components/Content';
import TaskEdit from '../Tasks/TaskEdit';
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from 'react';

const Task = () => {
  const params = useParams();
  const navigate = useNavigate();
  let taskName: string = 'task name';
  const taskData = jsonData && jsonData.find((e) => e.id === Number(params.id));

  const [category, setCategory] = useState(taskData?.category);
  const [description, setDescription] = useState(taskData?.description);
  const [summary, setSummary] = useState(taskData?.summary);
  const [answers, setAnswers] = useState(initializeAnswers());

  function initializeAnswers() {
    if (taskData?.answer === undefined) {
      return [];
    }

    let values = [];
    for (let i = 0; i < taskData.answer.length; i++) {
      let answer = taskData.answer[i];
      values.push(answer);
    }
    return values;
  }

  useEffect(() => {
    if (taskData?.id === undefined) {
      navigate('/*');
    }
  });
  if (taskData?.title !== undefined) taskName = taskData.title;

  return (
    <>
      <Content name={taskName}>
        <div className="row">
          <div className="col-lg-7 text-start ">
            <label> Summary</label>
            <div className="separation " />
            <div className="overflow-auto " style={{ height: '100px' }}>
              <p className="text-start"> {summary}</p>
            </div>
            <div>
              <label> Description</label>
              <div className="separation" />
              <div className="overflow-auto " style={{ height: '100px' }}>
                <p className="text-star overflow-auto"> {description} </p>
              </div>
            </div>
            <div>
              <label style={{ paddingTop: '10px' }}> Answer </label>
              <div className="separation" />
              <div className="overflow-auto " style={{ height: '100px' }}>
                {answers.map((answer) => {
                  /*if (taskData?.answer.length === 1) {
                    return (
                      <p key={answer.id} style={{ color: '#2babd3' }}>
                        {answer.text}{' '}
                      </p>
                    );
                  } else*/ if (answer.isCorrect) {
                    return (
                      <p key={answer.id} style={{ color: '#2babd3' }}>
                        {answer.text}{' '}
                      </p>
                    );
                  } else return <p key={answer.id}> {answer.text}</p>;
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
              <p style={{ textAlign: 'center' }}>{taskData?.votes}</p>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between">
                <label>Task author</label>

                <p>{taskData?.creator}</p>
              </div>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between">
                <label>Date of creation</label>

                <p>{taskData?.date}</p>
              </div>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between ">
                <label>Category</label>

                <p>{taskData?.category}</p>
              </div>
              <div className=" separation" />
              <div className="d-flex flex-row around justify-content-between py-1 ">
                <TaskEdit
                  id={taskData?.id}
                  isInList={false}
                  setCategoryeOld={setCategory}
                  setDescriptionOld={setDescription}
                  setSummaryOld={setSummary}
                  setAnswersOld={setAnswers}
                />
                <button type="button" className=" btn btn-danger rounded-pill" style={{ width: '100px' }}>
                  {' '}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Task;
