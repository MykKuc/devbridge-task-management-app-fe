import * as React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import './TaskEdit.css';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Content from '../../Components/Content';

import taskJsonData from '../../pages/Tasks/tasks.json';
import EditForm from './EditForm';
import EditButtons from './EditButtons';

interface Props {
  id: number;
  isInList: boolean;

  handleModify?: Function;

  setCategoryOld?: Function;
  setSummaryOld?: Function;
  setDescriptionOld?: Function;
  setAnswersOld?: Function;
}
export default function TaskEdit(props: Props) {
  // Task's id
  const id = props.id;
  // Boolean for determining whether edit window opened from task list or specific task
  const isInList = props.isInList;

  // Method for displaying changed values in task list
  const handleModify = props.handleModify;

  // useState instances for displaying changes values in specific task
  const setCategoryOld = props.setCategoryOld;
  const setSummaryOld = props.setSummaryOld;
  const setDescriptionOld = props.setDescriptionOld;
  const setAnswersOld = props.setAnswersOld;

  // Current task's data
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
            <EditForm
              summary={summary !== null ? summary : ''}
              setSummary={setSummary}
              description={description}
              setDescription={setDescription}
              descriptionValidation={descriptionValidation}
              historicalAnswerCount={historicalAnswerCount}
              answers={answers}
              handleAnswerChange={handleAnswerChange}
              handleCheckmarkClick={handleCheckmarkClick}
              invalidAnswerIds={invalidAnswerIds}
              invalidAnswerErrors={invalidAnswerErrors}
              votes={currTask?.votes}
              creator={currTask?.creator}
              date={currTask?.date}
              category={category}
              setCategory={setCategory}
            />
            <EditButtons handleClose={handleClose} saveTaskEditChanges={saveTaskEditChanges} />
          </Content>
        </div>
      </Modal>
    </div>
  );

  // Handles changes to any of the answer's text
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
  // Handles clicks on any of the answer's 'is correct?' checkmarks
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
  // Saves edited information
  function saveTaskEditChanges() {
    const allIsValid = validateFields();
    if (allIsValid) {
      setNewValues();
      handleClose();
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
  function setNewValues() {
    if (isInList && handleModify !== undefined) {
      // Saving into task list
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
}
/*function deleteAnswerRow(answerRowId: string) {
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
}*/
