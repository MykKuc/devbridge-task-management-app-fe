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

const TextAnswer: React.FC<Props> = ({ answer, handleAnswerChange }) => {
  const [ans, setAnswer] = React.useState(answer[0].text);
  const handleInput = (answer: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleAnswerChange(answer.target.value);
    console.log(answer.target.value);
    setAnswer(answer.target.value);
  };
  return (
    <div id="full-input">
      <label id="big-label">Correct answer</label>
      <br />
      <textarea style={{ height: 100 }} id="big-input" name="answer" required value={ans} onChange={handleInput} />
    </div>
  );
};

export default TextAnswer;
