import React, { useState } from 'react';
import CheckBox from '@mui/material/Checkbox';
import './TaskCreation.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Row, Col } from 'react-grid-system';

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

  const handleChange = (index: any) => {
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
    <>
      <Row>
        <Col md={10} sm={8} xs={8}>
          <label className="mult-label">
            Answers<label className="required-star">*</label>
          </label>
        </Col>
        <Col md={1} sm={2} xs={2}>
          <label className="correct-label">Correct</label>
        </Col>
      </Row>
      {answers.map((answer, index) => {
        return (
          <Row key={index} style={{ marginBottom: '10px' }}>
            <Col md={10} sm={8} xs={8}>
              <input
                style={{ width: '95%' }}
                className="multiple-input"
                type="text"
                required
                name="answer"
                placeholder="Answer"
                value={answer.text}
                onChange={(event) => handleTextChange(index, event)}
              />
            </Col>
            <Col md={1} sm={2} xs={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <CheckBox
                className="multiple-checkbox"
                name="correct"
                checked={answer.correct}
                onChange={() => handleChange(index)}
              />
            </Col>
            <Col md={1} sm={2} xs={2}>
              <IconButton style={{ float: 'right' }} onClick={() => handleDelete(index)} disabled={answers.length <= 2}>
                <DeleteIcon className="answer-delete-button" />
              </IconButton>
            </Col>
          </Row>
        );
      })}
      <Row align="center" style={{ marginBottom: '10px' }}>
        <Col>
          <button className="button-primary add-answer-button" onClick={addNewAnswer}>
            <span className="material-symbols-outlined">add</span>
          </button>
        </Col>
      </Row>
    </>
  );
};

export default MultipleAnswer;
