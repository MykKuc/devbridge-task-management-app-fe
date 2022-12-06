import * as React from 'react';
import EmptyModal from 'components/EmptyModal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'components/EmptyModal.css';

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
  const [open, setOpen] = useState(show);
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [formValid, setFormValid] = useState(false);
  const [validationChecked, setValidationChecked] = useState(false);
  const [validation, SetValidation] = useState({
    formErrors: { title: '', description: '' },
    titleValid: true,
    descriptionValid: true,
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    validation.formErrors = { title: '', description: '' };
    validation.titleValid = true;
    validation.descriptionValid = true;
    setTitleInput(title);
    setDescriptionInput(description);
    setOpen(false);
    setShow(false);
  };

  function validateFields() {
    let fieldValidationErrors = validation.formErrors;
    let titleValid = validation.titleValid;
    let descriptionValid = validation.descriptionValid;

    titleValid = titleInput.length > 0;
    fieldValidationErrors.title = titleValid ? '' : 'Title is not entered.';

    descriptionValid = descriptionInput.length > 0;
    fieldValidationErrors.description = descriptionValid ? '' : 'Description is not entered.';

    SetValidation({
      formErrors: fieldValidationErrors,
      titleValid: titleValid,
      descriptionValid: descriptionValid,
    });
  }
  function saveCategory() {
    //SET NEW VALUES TO DATABASE INSTEAD:
    handleEdit(id, titleInput, descriptionInput);
    setOpen(false);
    setShow(false);
  }
  useEffect(() => {
    if (formValid && validationChecked) {
      saveCategory();
      setOpen(false);
    }
  }, [formValid, validationChecked]);
  useEffect(() => {
    if (true) {
      setFormValid(validation.titleValid && validation.descriptionValid);
      setValidationChecked((validationChecked) => !validationChecked);
    }
  }, [validation]);

  function handleSumbit() {
    validateFields();
  }

  return (
    <div>
      <div className="edit-btn" onClick={handleOpen}></div>
      <EmptyModal show={open} title={'Edit Category'} close={handleClose}>
        <div className="d-flex justify-content-center">
          <div className="col-6 mt-5">
            <label htmlFor="title" className="ps-2 label">
              Title<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              id="title"
            />
            {!validation.titleValid && <p className="alert alert-danger">{validation.formErrors.title}</p>}
            <br />
            <label htmlFor="description" className="ps-2 label">
              Description<span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              style={{ height: '200px' }}
              placeholder="Description"
              className="input"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              id="description"
            />
            {!validation.descriptionValid && <p className="alert alert-danger">{validation.formErrors.description}</p>}
            <div className="d-flex justify-content-center">
              <button onClick={handleSumbit} className="button blue my-5 text-center me-3">
                SAVE
              </button>
              <button onClick={handleClose} className="button red my-5 text-center ">
                CANCEL
              </button>
            </div>
          </div>
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
