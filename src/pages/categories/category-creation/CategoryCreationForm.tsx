import React from 'react';
import { useState } from 'react';
import './CategoryForm.css';
import { Container, Row, Col } from 'react-grid-system';

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
    <div className="category-form-wrapper">
      <label className="required-label">required*</label>

      <form className="category-form" onSubmit={handleSubmit}>
        <Container>
          <Row align="center" style={{ marginBottom: '10px' }}>
            <Col className="input-column">
              <label className="input-label">
                Title<label className="required-star">*</label>
              </label>
              <input
                className="big-input title-input"
                type="text"
                name="title"
                placeholder="Title"
                required
                onChange={handleTitleChange}
                value={categoryTitle}
              />
            </Col>
          </Row>
          <Row align="center" style={{ marginBottom: '10px' }}>
            <Col className="input-column">
              <label className="input-label">
                Description<label className="required-star">*</label>
              </label>
              <textarea
                className="big-input"
                name="description"
                placeholder="Description"
                required
                onChange={handleDescriptionChange}
                value={description}
              />
            </Col>
          </Row>
          <Row className="category-buttons" align="center" justify="center">
            <button type="submit" className="button-primary">
              Save
            </button>
            <button onClick={handleCancel} className="button-secondary">
              Cancel
            </button>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default CategoryCreationForm;
