import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import './TaskEdit.css';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Content from '../../Components/Content';

import taskJsonData from './tasks.json';
import categoryJsonData from '../categories/MockCategories.json';

function deleteAnswerRow(answerRowId) {
  console.warn('i is pressed');
  let answerRow = document.getElementById(answerRowId);
  if (answerRow !== undefined) {
    answerRow.remove();
  }
}

function addAnswerRow(historicalRowCount) {
  let answersDiv = document.getElementById('answers');
  let rowId = 'answer-' + historicalRowCount;
  historicalRowCount++;

  let row = document.createElement('div');
  let answerDiv = document.createElement('div');
  let answerInput = document.createElement('input');
  let checkboxDiv = document.createElement('div');
  let checkboxInput = document.createElement('input');
  let deleteBtnDiv = document.createElement('div');
  let deleteBtn = document.createElement('button');

  row.id = rowId;
  row.classList.add('row');
  row.style.marginBottom = '5px';
  answerDiv.classList.add('col-7');
  answerInput.classList.add('input');
  answerInput.classList.add('answer');
  answerInput.type = 'text';
  answerInput.value = 'New Answer';
  answerInput.style.borderRadius = '10px';
  checkboxDiv.classList.add('col-sm');
  checkboxDiv.style.textAlign = 'center';
  checkboxInput.type = 'checkbox';
  checkboxInput.name = 'newAnswer';
  deleteBtnDiv.classList.add('col-sm');
  deleteBtnDiv.style.textAlign = 'center';
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('btn-danger');
  deleteBtn.addEventListener('click', function () {
    deleteAnswerRow(rowId);
  });
  deleteBtn.innerHTML = 'Delete';

  answerDiv.appendChild(answerInput);
  checkboxDiv.appendChild(checkboxInput);
  deleteBtnDiv.appendChild(deleteBtn);

  row.appendChild(answerDiv);
  row.appendChild(checkboxDiv);
  row.appendChild(deleteBtnDiv);

  answersDiv.appendChild(row);
}
export default function TaskEdit(props) {
  const { id, isInList } = props;
  const currTask = taskJsonData && taskJsonData.find((e) => e.id === Number(id));
  const [summary, setSummary] = useState(currTask.summary);
  const [description, setDescription] = useState(currTask.description);
  //const [answers, setAnswers]=useState(initializeAnswers());

  const [descriptionValidation, setDescriptionValidation] = useState(0);
  const [answerValidation, setAnswerValidation] = useState({ answerIds: [], answerErrors: [] });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let historicalAnswerCount = 0;

  /*function initializeAnswers(){
    let values = [];
    for(let i = 0;i<currTask.answer.length;i++){
      let answer = currTask[i];
      values.push(answer.text);
    }
    return values;
  }*/
  const handleValidationChange = (newValue) => {
    setDescriptionValidation(newValue);
  };
  function saveTaskEditChanges() {
    const allIsValid = validateFields();
    if (allIsValid) {
      setNewValues();
      //handleClose();
    }
  }
  function validateFields() {
    let allIsValid = true;
    let answerInputs = document.getElementsByClassName('input answer');

    if (description.length === 0) {
      setDescriptionValidation(1);
      allIsValid = false;
    }

    let ids = [];
    let errors = [];
    for (let i = 0; i < answerInputs.length; i++) {
      let answer = answerInputs[i];
      if (answer === '') {
        ids.push(answer.id);
        errors.push('* Answer text is required');
        if (allIsValid) {
          allIsValid = false;
        }
      }
    }
    setAnswerValidation({ answerIds: ids, answerErrors: errors });

    return allIsValid;
  }
  function setNewValues() {}

  return (
    <div>
      {isInList ? (
        <GridActionsCellItem
          className="task-action-button"
          icon={<EditIcon />}
          onClick={() => handleOpen()}
          label="Edit"
        />
      ) : (
        <button
          type="button"
          className=" btn btn-primary rounded-pill "
          style={{ width: '100px' }}
          onClick={() => handleOpen()}
        >
          {' '}
          Edit
        </button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Content name={currTask?.title}>
          <div className="row">
            <div className="col-lg-7 text-start ">
              <label> Summary</label>
              <div className="overflow-auto " style={{ height: '100px' }}>
                <input
                  onChange={(e) => setSummary(e.target.value)}
                  value={summary}
                  type={'text'}
                  name={'summary'}
                  id={'summary'}
                  className={'input'}
                  style={{ color: 'white', borderRadius: '10px', height: '40px' }}
                  placeholder={'Summary'}
                />
              </div>
              <div>
                {() => {
                  if (descriptionValidation !== '') {
                    console.error('! description is not valid !');
                    return <label style={{ color: 'red' }}>{descriptionValidation}</label>;
                  }
                }}
                <label> Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className={'form-control overflow-auto'}
                  placeholder={'description'}
                  rows={3}
                  style={{
                    resize: 'none',
                    background: '#383838',
                    color: 'white',
                    border: '2px solid var(--accent-color)',
                  }}
                ></textarea>
              </div>
              <div>
                <label style={{ paddingTop: '10px' }}> Answers </label>

                <div className="separation" />

                <div className="container">
                  <div className="row" style={{ marginTop: '5px', marginBottom: '5px' }}>
                    <div className="col-7">
                      <span>
                        <b>Answer</b>
                      </span>
                    </div>
                    <div className="col-sm">
                      <span>
                        <b>Is correct?</b>
                      </span>
                    </div>
                    <div className="col-sm">
                      <button
                        className={'btn btn-sm btn-success'}
                        onClick={function () {
                          addAnswerRow(historicalAnswerCount);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div id={'answers'} style={{ overflowY: 'auto', overflowX: 'clip', height: '100px' }}>
                    {currTask.answer !== undefined
                      ? currTask?.answer.map((answer) => {
                          let rowId = 'answer-' + historicalAnswerCount;
                          let idNum = historicalAnswerCount;
                          historicalAnswerCount++;

                          if (currTask.answer.length === 1 || answer.isCorrect) {
                            if (answerValidation.answerIds.includes(rowId)) {
                              return (
                                <>
                                  <label style={{ color: 'red' }}>answerValidation.answerErrors[idNum]</label>
                                  <div id={rowId} className={'row'} style={{ marginBottom: '5px' }}>
                                    <div className={'col-7'}>
                                      <input
                                        className={'input answer'}
                                        type={'text'}
                                        key={answer.id}
                                        value={answer.text}
                                        style={{ borderRadius: '10px' }}
                                      />
                                    </div>
                                    <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                      <input type={'checkbox'} name={answer.id} checked />
                                    </div>
                                    <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                      <button
                                        className={'btn btn-danger'}
                                        onClick={function () {
                                          deleteAnswerRow(rowId);
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </>
                              );
                            } else {
                              return (
                                <div id={rowId} className={'row'} style={{ marginBottom: '5px' }}>
                                  <div className={'col-7'}>
                                    <input
                                      className={'input answer'}
                                      type={'text'}
                                      key={answer.id}
                                      value={answer.text}
                                      style={{ borderRadius: '10px' }}
                                    />
                                  </div>
                                  <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                    <input type={'checkbox'} name={answer.id} checked />
                                  </div>
                                  <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                    <button
                                      className={'btn btn-danger'}
                                      onClick={function () {
                                        deleteAnswerRow(rowId);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          } else if (answerValidation.answerIds.includes(rowId)) {
                            return (
                              <>
                                <label style={{ color: 'red' }}>answerValidation.answerErrors[idNum]</label>
                                <div id={rowId} className={'row'} style={{ marginBottom: '5px' }}>
                                  <div className={'col-7'}>
                                    <input
                                      className={'input answer'}
                                      type={'text'}
                                      key={answer.id}
                                      value={answer.text}
                                      style={{ borderRadius: '10px' }}
                                    />
                                  </div>
                                  <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                    <input type={'checkbox'} name={answer.id} />
                                  </div>
                                  <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                    <button
                                      className={'btn btn-danger'}
                                      onClick={function () {
                                        deleteAnswerRow(rowId);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <div id={rowId} className={'row'} style={{ marginBottom: '5px' }}>
                                <div className={'col-7'}>
                                  <input
                                    className={'input answer'}
                                    type={'text'}
                                    key={answer.id}
                                    value={answer.text}
                                    style={{ borderRadius: '10px' }}
                                  />
                                </div>
                                <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                  <input type={'checkbox'} name={answer.id} />
                                </div>
                                <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                  <button
                                    className={'btn btn-danger'}
                                    onClick={function () {
                                      deleteAnswerRow(rowId);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            );
                          }
                        })
                      : ''}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col align-middle"
              style={{
                marginRight: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className="row justify-content-center text-center" style={{ width: '250px' }}>
                <div style={{ color: 'white' }}>
                  <ThumbUpIcon />
                </div>
                <p style={{ textAlign: 'center' }}>{currTask?.votes}</p>
                <div className=" separation" />
                <div className="d-flex flex-row around justify-content-between">
                  <label>Task author</label>

                  <p>{currTask?.creator}</p>
                </div>
                <div className=" separation" />
                <div className="d-flex flex-row around justify-content-between">
                  <label>Date of creation</label>

                  <p>{currTask?.date}</p>
                </div>
                <div className=" separation" />
                <div className="d-flex flex-row around justify-content-between ">
                  <label>Category</label>
                  <select className={'form-select-sm'} style={{ margin: '3px' }} value={currTask?.category}>
                    {categoryJsonData.categories.map((category) => {
                      return <option value={category.id}>{category.title}</option>;
                    })}
                  </select>
                </div>
                <div className=" separation" />
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div>
              <button id={'save-button'} className={'btn btn-secondary btn-lg float-end'} onClick={handleClose}>
                CANCEL
              </button>
              <button id={'save-button'} className={'btn btn-primary btn-lg float-end'} onClick={saveTaskEditChanges}>
                SAVE
              </button>
            </div>
          </div>
        </Content>
      </Modal>
    </div>
  );
}
