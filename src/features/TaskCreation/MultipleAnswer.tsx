import React, { useState } from 'react';
import './TaskCreation.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jsx } from '@emotion/react';

interface Props {
  answer: {
    text: string;
  }[];
  handleAnswerChange: any;
}

const MultipleAnswer: React.FC<Props> = ({ answer, handleAnswerChange }) => {
  return (
    <div id="full-input">
      <label id="big-label">Correct answer</label>
      <br />
      <textarea
        style={{ height: 100 }}
        id="big-input"
        name="description"
        placeholder="Description"
        required
        value={answer[0].text}
        //onChange={handleInput}
      />
    </div>
  );
};

export default MultipleAnswer;
