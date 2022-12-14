import * as React from 'react';
import EmptyModal from 'components/EmptyModal';
import { useState, useEffect } from 'react';
import 'components/EmptyModal.css';
import './category-creation/CategoryForm.css';
import { Col, Container, Row } from 'react-grid-system';
import config from '../../config';

interface CategoryEditData {
  name: String;
  description: String;
}

interface Props {
  show: boolean;
  close: () => void;
  id: number;
  fetchCategories: () => void;
}

export default function CategoryEdit(props: Props) {
  const [category, setCategory] = useState<CategoryEditData>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });

  useEffect(() => {
    fetch(`${config.backendURL}/categories/${props.id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
        }
      })
      .then((data) => {
        setCategory(data);
      });
  }, []);

  useEffect(() => {
    if (category !== undefined) {
      setTitle(category?.name as string);
      setDescription(category?.description as string);
    }
  }, [category]);

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

  function handleSubmit(e: any) {
    e.preventDefault();

    if (category === undefined) {
      props.close();
      return;
    }

    if (category.name === title && category.description === description) {
      props.close();
    } else {
      if (!clientValidation()) {
        return;
      }

      const updatedCategory: CategoryEditData = {
        name: title,
        description: description,
      };

      fetch(`${config.backendURL}/categories/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
      })
        .then((response) => {
          if (response.status === 200) {
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
    }
  }

  return (
    <div>
      <EmptyModal
        show={props.show}
        close={props.close}
        title={'Edit Category'}
        height="40vh"
        bootstrapColumnBreaks="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-sm-11 col-12"
      >
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
      </EmptyModal>
    </div>
  );
}
