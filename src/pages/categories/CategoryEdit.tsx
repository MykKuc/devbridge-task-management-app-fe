import * as React from 'react';
import EmptyModal from 'components/EmptyModal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import 'components/EmptyModal.css';
import './category-creation/CategoryForm.css';
import { Col, Container, Row } from 'react-grid-system';

export default function CategoryEdit({
  show,
  setShow,
  id,
  title,
  description,
  handleEdit,
}: {
  show: boolean;
  setShow: Function;
  id: string;
  title: string;
  description: string;
  handleEdit: Function;
}) {
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);

  const handleClose = () => {
    setShow(false);
  };

  function saveCategory() {
    //SET NEW VALUES TO DATABASE INSTEAD:
    handleEdit(id, titleInput, descriptionInput);
    setShow(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    saveCategory();
    setShow(false);
  }

  return (
    <div>
      <EmptyModal
        show={show}
        close={handleClose}
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
                    onChange={(e) => setTitleInput(e.target.value)}
                    value={titleInput}
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
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    value={descriptionInput}
                  />
                </Col>
              </Row>
              <Row className="category-buttons" align="center" justify="center">
                <button type="submit" className="button-primary">
                  Save
                </button>
                <button onClick={handleClose} className="button-secondary">
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

CategoryEdit.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
