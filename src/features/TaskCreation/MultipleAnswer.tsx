import React, { useState } from 'react';
import CheckBox from '@mui/material/Checkbox';
import './TaskCreation.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jsx } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

interface Props {
  answer: {
    text: string;
    correct: boolean;
  }[];
  handleMultipleChange: any;
}

const MultipleAnswer = (props: Props) => {
  const { answer, handleMultipleChange } = props;
  const [answers, setAnswers] = useState(answer);

  const handleTextChange = (index: any, event: any) => {
    let data = [...answers];
    data[index]['text'] = event.target.value;
    handleMultipleChange(data);
    setAnswers(data);
  };

  const handleChange = (index: any, event: React.ChangeEvent<HTMLInputElement>) => {
    let data = [...answers];
    data[index]['correct'] = !data[index]['correct'];
    handleMultipleChange(data);
    setAnswers(data);
  };

  const addNewAnswer = (event: any) => {
    event.preventDefault();
    let data = [...answers];
    data.push({ text: '', correct: false });
    handleMultipleChange(data);
    setAnswers(data);
  };

  const handleDelete = (index: any) => {
    let data = [...answers];
    data.splice(index, 1);
    handleMultipleChange(data);
    setAnswers(data);
  };

  return (
    <div className="full-input">
      <label className="big-label">Answers</label>
      <label style={{ marginLeft: '70%' }} className="big-label">
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
            <IconButton className="answer-delete-button" onClick={() => handleDelete(index)}>
              <DeleteIcon className="answer-delete-button" />
            </IconButton>
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
