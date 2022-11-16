import React, { useState } from 'react';
import CheckBox from '@mui/material/Checkbox';
import './TaskCreation.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jsx } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  answer: {
    text: string;
    correct: boolean;
  }[];
  handleAnswerChange: any;
  //handleNewAnswer: any;
  //handleDelete: any;
}

const MultipleAnswer: React.FC<Props> = ({ answer, handleAnswerChange }) => {
  const [answers, setAnswers] = useState(answer);

  const handleTextChange = (index: any, event: any) => {
    let data = [...answers];
    data[index]['text'] = event.target.value;
    setAnswers(data);
  };

  const handleChange = (index: any, event: React.ChangeEvent<HTMLInputElement>) => {
    let data = [...answers];
    data[index]['correct'] = !data[index]['correct'];
    setAnswers(data);
  };

  const addNewAnswer = (event: any) => {
    event.preventDefault();
    let data = [...answers];
    data.push({ text: '', correct: false });
    setAnswers(data);
  };

  return (
    <div className="full-input">
      <label className="big-label">Answers</label>
      <label style={{ marginLeft: '73%' }} className="big-label">
        Correct
      </label>
      <br />
      {answers.map((answer, index) => {
        return (
          <div key={index}>
            <input
              style={{ width: '600px', float: 'left' }}
              className="multiple-input"
              type="text"
              name="answer"
              placeholder="Answer"
              value={answer.text}
              onChange={(event) => handleTextChange(index, event)}
            />
            <CheckBox
              className="multiple-checkbox"
              name="correct"
              checked={answer.correct}
              onChange={(event) => handleChange(index, event)}
            />
            <DeleteIcon className="answer-delete-button" />
          </div>
        );
      })}
      <button className="add-answer-button" onClick={addNewAnswer}>
        +
      </button>
    </div>
  );
};

export default MultipleAnswer;
