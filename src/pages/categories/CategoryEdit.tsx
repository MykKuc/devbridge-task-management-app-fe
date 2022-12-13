import * as React from 'react';
import EmptyModal from 'components/EmptyModal';
import { useState, useEffect } from 'react';
import 'components/EmptyModal.css';
import './category-creation/CategoryForm.css';
import { Col, Container, Row } from 'react-grid-system';
import config from '../../config';

interface CategoryEditData {
  id: Number;
  name: String;
  description: String;
}

interface Props {
  show: boolean;
  close: () => void;
  id: number;
  handleEdit: any;
}

export default function CategoryEdit(props: Props) {
  const [category, setCategory] = useState<CategoryEditData>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

  const handleTitleChange = (title: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(title.target.value);
  };

  const handleDescriptionChange = (description: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(description.target.value);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    if (category !== undefined) {
      const newCategory: CategoryEditData = {
        id: category.id,
        name: title,
        description: description,
      };
      props.handleEdit(newCategory);
    }
    props.close();
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
                    value={title}
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
