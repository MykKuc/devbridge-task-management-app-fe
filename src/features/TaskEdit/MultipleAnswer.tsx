import React, { useState } from 'react';
import CheckBox from '@mui/material/Checkbox';
import './TaskEdit.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Row, Col } from 'react-grid-system';

interface Answer {
  id: Number;
  text: String;
  correct: boolean;
}
interface Props {
  answer: Answer[];
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
    data.push({ id: -1, text: '', correct: false });
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
        <Col md={10}>
          <label className="mult-label">
            Answers<label className="required-star">*</label>
          </label>
        </Col>
        <Col md={1}>
          <label className="correct-label">Correct</label>
        </Col>
      </Row>
      {answers.map((answer, index) => {
        return (
          <Row key={index}>
            <Col md={10}>
              <input
                style={{ width: '95%' }}
                className="multiple-input"
                type="text"
                required
                name="answer"
                placeholder="Answer"
                value={answer.text as string}
                onChange={(event) => handleTextChange(index, event)}
              />
            </Col>
            <Col md={1}>
              <CheckBox
                className="multiple-checkbox"
                name="correct"
                checked={answer.correct}
                onChange={() => handleChange(index)}
              />
            </Col>
            <Col md={1}>
              <IconButton
                className="answer-delete-button"
                style={{ float: 'right', marginRight: '2.5%' }}
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon className="answer-delete-button" />
              </IconButton>
            </Col>
          </Row>
        );
      })}
      <Row align="center" style={{ height: '60px' }}>
        <Col>
          <button className="add-answer-button" onClick={addNewAnswer}>
            +
          </button>
        </Col>
      </Row>
    </>
  );
};

export default MultipleAnswer;
