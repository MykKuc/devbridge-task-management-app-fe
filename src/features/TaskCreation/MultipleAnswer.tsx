import React, { useState } from 'react';
import { CheckBox } from '@mui/icons-material';
import './TaskCreation.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jsx } from '@emotion/react';

interface Props {
  answer: {
    text: string;
  }[];
  handleAnswerChange: any;
  //handleNewAnswer: any;
  //handleDelete: any;
}

const MultipleAnswer: React.FC<Props> = ({ answer, handleAnswerChange }) => {
  return (
    <div className="full-input">
      <div key={'1'}>
        <label className="big-label">Answer</label>
        <label className="big-label">Correct</label>
        <br />
        <input
          style={{ width: '600px', float: 'left' }}
          className="multiple-input"
          type="text"
          name="summary"
          placeholder="Summary"
          value="Aaa"
          //onChange={handleSummaryChange}
        />

        <CheckBox className="multiple-checkbox" />
      </div>
    </div>
  );
};

export default MultipleAnswer;
