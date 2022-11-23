import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CategoryEdit.css';

export default function CategoryEdit({
  titleOld,
  setTitleOld,
  descriptionOld,
  setDescriptionOld,
}: {
  titleOld: string;
  setTitleOld: Function;
  descriptionOld: string;
  setDescriptionOld: Function;
}) {
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState(titleOld);
  const [descriptionInput, setDescriptionInput] = useState(descriptionOld);
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
    setTitleInput(titleOld);
    setDescriptionInput(descriptionOld);
    setOpen(false);
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
    setTitleOld(titleInput);
    setDescriptionOld(descriptionInput);
  }
  useEffect(() => {
    if (formValid) {
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="empty-modal">
          <Button onClick={handleClose} className="modal-close-button">
            <p className="modal-close-button-text">X</p>
          </Button>

          <Box className="modal-header">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              className="modal-header-hidden"
            >
              .
            </Typography>
          </Box>
          <h2 className="modal-header-text">Edit Category</h2>

          <Typography id="modal-modal-description" className="modal-main-body">
            <div>
              <label htmlFor="title" className="ps-2 label">
                Title
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
                Description
              </label>
              <textarea
                style={{ height: '200px' }}
                placeholder="Description"
                className="input"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                id="description"
              />
              {!validation.descriptionValid && (
                <p className="alert alert-danger">{validation.formErrors.description}</p>
              )}
              <div className="d-flex justify-content-center">
                <button onClick={handleSumbit} className="button blue my-5 text-center me-3">
                  SAVE
                </button>
                <button onClick={handleClose} className="button red my-5 text-center ">
                  CANCEL
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

CategoryEdit.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
};
