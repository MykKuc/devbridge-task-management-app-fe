import { title } from 'process';
import React from 'react';
import { useState } from 'react';
import './CategoryCreationForm.css';

interface Props {
  handleAdd: any;
  close: () => void;
}

const CategoryCreationForm = (props: Props) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (title: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryTitle(title.target.value);
  };

  const handleDescriptionChange = (description: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(description.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const date = new Date();
    var current_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const category = {
      id: 50,
      title: categoryTitle,
      description: description,
      creator: 'Default',
      date: current_date,
    };
    console.log(category);
    props.handleAdd(category);
    props.close();
  };

  const handleCancel = () => {
    props.close();
  };

  return (
    <>
      <p className="category-creation-required">required *</p>

      <form onSubmit={handleSubmit}>
        <label id="title-label" htmlFor="category-title-input">
          Title<span className="important-asterisk">*</span>
        </label>
        <input onChange={handleTitleChange} id="category-title-input" type="text" placeholder="Title"></input>

        <label id="description-label" htmlFor="category-description-input">
          Description<span className="important-asterisk">*</span>
        </label>
        <textarea
          onChange={handleDescriptionChange}
          id="category-description-input"
          required
          placeholder="Description"
        ></textarea>

        <button type="submit" className="category-creation-submit-button">
          SAVE
        </button>
        <button onClick={handleCancel} className="category-creation-cancel-button">
          CANCEL
        </button>
      </form>
    </>
  );
};

export default CategoryCreationForm;
