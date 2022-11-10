import React, { useEffect, useState } from 'react';
import './TaskCreation.css';
import { NavLink, useNavigate } from 'react-router-dom';
import jsonData from './categories.json';
import TextAnswer from './TextAnswer';
import MultipleAnswer from './MultipleAnswer';

const loadData = JSON.parse(JSON.stringify(jsonData));

function TaskCreationForm() {
  const initialAnswer = [{ text: 'Answer', correct: true }];
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [type, setType] = React.useState('');
  const [answer, setAnswer] = React.useState(initialAnswer);

  const [showTextAnswer, setShowTextAnswer] = React.useState(true);
  const [showMultipleAnswer, setShowMultipleAnswer] = React.useState(false);

  useEffect(() => {
    type === 'text' ? setShowTextAnswer(true) : setShowTextAnswer(false);
    type === 'multiple' ? setShowMultipleAnswer(true) : setShowMultipleAnswer(false);
  });

  const handleCategoryChange = (category: React.SetStateAction<string>) => {
    setCategory(category);
  };

  const handleTypeChange = (type: React.SetStateAction<string>) => {
    setType(type);
  };

  const handleSingleAnswerChange = (answer: string) => {
    if (type === 'Text') {
      const newAnswer = [];
      newAnswer.push({ text: answer, correct: true });
      setAnswer(newAnswer);
    }
  };

  // Handle inputs onChange to sync input value with local state
  const handleTitleChange = (title: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(title.target.value);
  };
  const handleDescriptionChange = (description: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(description.target.value);
  };
  const handleSummaryChange = (summary: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(summary.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {};

  return (
    <div id="task-form">
      <form id="task-form" onSubmit={handleSubmit}>
        <div id="half-input">
          <label id="small-label">Title</label>
          <br />
          <input
            id="small-input"
            type="text"
            name="title"
            placeholder="Title"
            required
            onChange={handleTitleChange}
            value={title}
          />
        </div>
        <div id="half-input">
          <label id="small-label">Category</label>
          <br />
          <select
            id="category-dropdown"
            name="category"
            value={category}
            onChange={(event) => handleCategoryChange(event.target.value)}
          >
            {loadData.categories.map((category: any) => {
              return (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <div id="full-input">
          <label id="big-label">Description</label>
          <br />
          <textarea
            style={{ height: 100 }}
            id="big-input"
            name="description"
            placeholder="Description"
            required
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>
        <br />
        <div id="full-input">
          <label id="big-label">Summary</label>
          <br />
          <input
            id="big-input"
            type="text"
            name="summary"
            placeholder="Summary"
            value={summary}
            onChange={handleSummaryChange}
          />
        </div>
        <br />
        <div id="half-input">
          <label id="small-label">Answer type</label>
          <br />
          <select
            id="category-dropdown"
            name="type"
            value={type}
            onChange={(event) => handleTypeChange(event.target.value)}
          >
            <option key="select" value="">
              ---Select---
            </option>
            <option key="text" value="text">
              Text
            </option>
            <option key="multiple" value="multiple">
              Multiple choice
            </option>
          </select>
        </div>
        <br />
        {showTextAnswer && <TextAnswer answer={answer} handleAnswerChange={handleSingleAnswerChange} />}
        {
          showMultipleAnswer //&&
          //<MultipleAnswer answer={answer} handleAnswerChange={handleAnswerChange} />
        }
        <br />
        <div id="full-input">
          <button id="create-btn" type="submit" className="button">
            CREATE
          </button>
        </div>
        <br />
      </form>
    </div>
  );
}

export default TaskCreationForm;
