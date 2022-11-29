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
import Content from '../../../Components/Content';

import taskJsonData from '../../../pages/Tasks/tasks.json';
import categoryJsonData from '../../../pages/categories/MockCategories.json';
import TaskCreationForm from '../../TaskCreation/TaskCreationForm';
import EmptyModal from '../../../Components/EmptyModal';

interface Props {
  id: number;
  isInList: boolean;

  // for task list
  handleModify?: Function;

  // for task view
  setCategoryOld?: Function;
  setSummaryOld?: Function;
  setDescriptionOld?: Function;
  setAnswersOld?: Function;
}
export default function TaskEdit(props: Props) {
  const id = props.id;
  const isInList = props.isInList;
  const handleModify = props.handleModify;
  const setCategoryOld = props.setCategoryOld;
  const setSummaryOld = props.setSummaryOld;
  const setDescriptionOld = props.setDescriptionOld;
  const setAnswersOld = props.setAnswersOld;

  const currTask = taskJsonData && taskJsonData.find((e) => e.id === Number(id));

  const [category, setCategory] = useState(currTask?.category);
  const [summary, setSummary] = useState(currTask?.summary);
  const [description, setDescription] = useState(currTask?.description);
  const [answers, setAnswers] = useState(currTask?.answer);

  const [descriptionValidation, setDescriptionValidation] = useState('');
  const [invalidAnswerIds, setInvalidAnswerIds] = useState(Array<number>);
  const [invalidAnswerErrors, setInvalidAnswerErrors] = useState(Array<string>);

  let historicalAnswerCount = 0;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function saveTaskEditChanges() {
    const allIsValid = validateFields();
    if (allIsValid) {
      setNewValues();
      handleClose();
    }
  }
  function setNewValues() {
    if (isInList && handleModify !== undefined) {
      handleModify({
        id: id,
        title: currTask?.title,
        category: category,
        description: description,
        summary: summary,
        creator: currTask?.creator,
        answers: answers,
        date: currTask?.date,
        votes: currTask?.votes,
      });
    } else if (
      !isInList &&
      setCategoryOld !== undefined &&
      setSummaryOld !== undefined &&
      setDescriptionOld !== undefined &&
      setAnswersOld !== undefined
    ) {
      setCategoryOld(category);
      setSummaryOld(summary);
      setDescriptionOld(description);
      setAnswersOld(answers);
      if (answers !== undefined) {
        for (let i = 0; i < answers.length; i++) {
          console.log(answers[i].isCorrect);
        }
      }
    }
  }
  function validateFields() {
    if (answers === undefined || description === undefined) {
      return true;
    }

    let emptNumArr: number[] = [];
    let emptStrArr: string[] = [];
    setDescriptionValidation('');
    setInvalidAnswerIds(emptNumArr);
    setInvalidAnswerErrors(emptStrArr);

    let allIsValid = true;

    if (description.length === 0) {
      setDescriptionValidation('* Description is required');
      allIsValid = false;
    }

    let ids = [];
    let errors = [];
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      if (answer.text === '') {
        ids.push(i);
        errors.push('* Answer text is required');
        if (allIsValid) {
          allIsValid = false;
        }
      }
    }
    setInvalidAnswerIds(ids);
    setInvalidAnswerErrors(errors);

    return allIsValid;
  }

  function handleAnswerChange(idNum: number, newValue: string) {
    if (answers !== undefined) {
      let newAnswers: { id: number; text: string; isCorrect: boolean }[] = [];
      for (let i = 0; i < answers.length; i++) {
        newAnswers.push(answers[i]);
      }
      newAnswers[idNum].text = newValue;
      setAnswers(newAnswers);
    }
  }
  function handleCheckmarkClick(idNum: number) {
    if (answers !== undefined) {
      let answer = answers[idNum];
      if (answer.isCorrect === true) {
        answer.isCorrect = false;
      } else {
        answer.isCorrect = true;
      }
      console.log('answer.isCorrect: ' + answer.isCorrect);
    }
  }

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
        <div id={'main-container'}>
          <Content name={currTask !== undefined ? currTask.title : ''}>
            <div className="row">
              <div className="col-lg-7 text-start ">
                <label> Summary</label>
                <div className="overflow-auto " style={{ height: '100px' }}>
                  <input
                    onChange={(e) => setSummary(e.target.value)}
                    value={summary !== null ? summary : ''}
                    type={'text'}
                    name={'summary'}
                    id={'summary'}
                    className={'input'}
                    style={{ color: 'white', borderRadius: '10px', height: '40px' }}
                    placeholder={'Summary'}
                  />
                </div>
                {descriptionValidation !== '' ? <span style={{ color: 'red' }}>{descriptionValidation}</span> : ''}
                <div>
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
                    <div id={'answers'} style={{ overflowY: 'auto', overflowX: 'clip', height: '160px' }}>
                      {answers !== undefined
                        ? answers.map((answer) => {
                            let rowId: string = 'answer-' + historicalAnswerCount;
                            let idNum: number = historicalAnswerCount;
                            historicalAnswerCount++;

                            if (answers.length === 1 || answer.isCorrect) {
                              return (
                                <>
                                  {invalidAnswerIds.includes(idNum) ? (
                                    <span style={{ color: 'red' }}>{invalidAnswerErrors[idNum]}</span>
                                  ) : (
                                    ''
                                  )}
                                  <div id={rowId} className={'row'} style={{ marginBottom: '5px' }}>
                                    <div className={'col-7'}>
                                      <input
                                        onChange={(e) => handleAnswerChange(idNum, e.target.value)}
                                        className={'input answer'}
                                        type={'text'}
                                        key={answer.id}
                                        value={answer.text}
                                        style={{ borderRadius: '10px' }}
                                      />
                                    </div>
                                    <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                      <input
                                        onClick={(e) => handleCheckmarkClick(idNum)}
                                        type={'checkbox'}
                                        name={answer.id.toString()}
                                        defaultChecked={true}
                                      />
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
                                <>
                                  {invalidAnswerIds.includes(idNum) ? (
                                    <span style={{ color: 'red' }}>{invalidAnswerErrors[idNum]}</span>
                                  ) : (
                                    ''
                                  )}
                                  <div id={rowId} className={'row'} style={{ marginBottom: '5px' }}>
                                    <div className={'col-7'}>
                                      <input
                                        onChange={(e) => handleAnswerChange(idNum, e.target.value)}
                                        className={'input answer'}
                                        type={'text'}
                                        key={answer.id}
                                        value={answer.text}
                                        style={{ borderRadius: '10px' }}
                                      />
                                    </div>
                                    <div className={'col-sm'} style={{ textAlign: 'center' }}>
                                      <input
                                        onClick={(e) => handleCheckmarkClick(idNum)}
                                        type={'checkbox'}
                                        name={answer.id.toString()}
                                      />
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
                    <select
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      className={'form-select-sm'}
                      style={{ margin: '3px' }}
                      value={category}
                    >
                      {categoryJsonData.map((category) => {
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
        </div>
      </Modal>
    </div>
  );
}
function deleteAnswerRow(answerRowId: string) {
  console.warn('i is pressed');
  let answerRow = document.getElementById(answerRowId.toString());
  if (answerRow === null) {
    throw "In method 'deleteAnswerRow' variable 'answerRow' was null";
  }
  if (answerRow !== undefined) {
    answerRow.remove();
  }
}

function addAnswerRow(historicalRowCount: number) {
  let answersDiv = document.getElementById('answers');
  if (answersDiv === null) {
    throw "In method 'addAnswerRow' variable 'answersDiv' was null";
  }
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
    deleteAnswerRow(rowId.toString());
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
