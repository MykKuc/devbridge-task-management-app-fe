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
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);

  const handleOpen = () => {
    setShow(true);
  };
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
      <EmptyModal show={show} title={'Edit Category'} close={handleClose}>
        <div className="d-flex justify-content-center">
          <form className="col-6 mt-5" onSubmit={handleSubmit}>
            <label htmlFor="title" className="ps-2 label">
              Title<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Title"
              className="input"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              id="title"
            />
            <br />
            <label htmlFor="description" className="ps-2 label">
              Description<span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              style={{ height: '200px' }}
              required
              placeholder="Description"
              className="input"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              id="description"
            />
            <div className="d-flex justify-content-center">
              <button className="submit button blue my-5 text-center me-3">SAVE</button>
              <button className="button red my-5 text-center " onClick={handleClose}>
                CANCEL
              </button>
            </div>
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
