import React from 'react';
import { useState } from 'react';
import './CategoryForm.css';
import { Container, Row, Col } from 'react-grid-system';
import config from '../../../config';

interface CategoryCreateData {
  name: String;
  description: String;
}

interface Props {
  close: () => void;
  fetchCategories: () => void;
}

const CategoryCreationForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });

  const handleTitleChange = (titleInput: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(titleInput.target.value);
  };

  const handleDescriptionChange = (descriptionInput: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(descriptionInput.target.value);
  };

  const clientValidation = () => {
    let valid = true;

    let errorsTemp = { title: '', description: '' };

    if (title === '') {
      errorsTemp.title = 'Please fill out this field.';
      valid = false;
    }

    if (description === '') {
      errorsTemp.description = 'Please fill out this field.';
      valid = false;
    }

    setErrors(errorsTemp);

    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!clientValidation()) {
      return;
    }

    const newCategory: CategoryCreateData = {
      name: title,
      description: description,
    };

    fetch(`${config.backendURL}/categories/`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (response.status === 201) {
          props.fetchCategories();
          props.close();
        } else {
          response.json().then((errorLog) => {
            if (response.status === 400) {
              let errorsTemp = { title: '', description: '' };
              if (Object.hasOwn(errorLog, 'name')) errorsTemp.title = errorLog.name;

              if (Object.hasOwn(errorLog, 'description')) errorsTemp.description = errorLog.description;

              if (Object.hasOwn(errorLog, 'message')) errorsTemp.title = errorLog.message;

              setErrors(errorsTemp);
            } else {
              console.error('Unexpected error while updating category: ', errorLog);
            }
          });
        }
      })
      .catch((error) => console.error('Network error while updating category: ', error));
  };

  return (
    <div className="category-form-wrapper">
      <label className="required-label">required*</label>

      <form className="category-form" onSubmit={handleSubmit} noValidate>
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
                onChange={handleTitleChange}
                value={title}
              />
              {errors.title !== '' ? <label className="error-label">{errors.title}</label> : ''}
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
                onChange={handleDescriptionChange}
                value={description}
              />
              {errors.description !== '' ? <label className="error-label">{errors.description}</label> : ''}
            </Col>
          </Row>
          <Row className="category-buttons" align="center" justify="center">
            <button type="submit" className="button-primary">
              Save
            </button>
            <button onClick={props.close} className="button-secondary">
              Cancel
            </button>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default CategoryCreationForm;
