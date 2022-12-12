import React, { useEffect } from 'react';
import './TaskCreation.css';
import jsonData from './categories.json';
import TextAnswer from './TextAnswer';
import MultipleAnswer from './MultipleAnswer';
import { Container, Row, Col } from 'react-grid-system';
import config from '../../config';

const loadData = JSON.parse(JSON.stringify(jsonData));

interface Props {
  handleAdd: any;
  close: () => void;
}
function TaskCreationForm(props: Props) {
  const initialAnswer = [{ text: '', correct: true }];
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [category, setCategory] = React.useState(jsonData.categories[0]);
  const [type, setType] = React.useState('');
  const [answer, setAnswer] = React.useState(initialAnswer);

  const [titleValidation, setTitleValidation] = React.useState('');
  const [descriptionValidation, setDescriptionValidation] = React.useState('');
  const [summaryValidation, setSummaryValidation] = React.useState('');

  const [showTextAnswer, setShowTextAnswer] = React.useState(true);
  const [showMultipleAnswer, setShowMultipleAnswer] = React.useState(false);

  useEffect(() => {
    type === 'text' ? setShowTextAnswer(true) : setShowTextAnswer(false);
    type === 'multiple' ? setShowMultipleAnswer(true) : setShowMultipleAnswer(false);
  }, [type]);

  const handleCategoryChange = (category: string) => {
    const parsedCat = JSON.parse(category);
    setCategory(parsedCat);
  };

  const handleTypeChange = (type: React.SetStateAction<string>) => {
    setType(type);
  };

  const handleSingleAnswerChange = (answer: string) => {
    if (type === 'text') {
      const newAnswer = [];
      newAnswer.push({ text: answer, correct: true });
      setAnswer(newAnswer);
    }
  };

  const handleMultipleChange = (answer: any) => {
    if (type === 'multiple') {
      const newAnswer = [...answer];
      setAnswer(newAnswer);
    }
  };

  // Handle inputs onChange to sync input value with local state
  const handleTitleChange = (title: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(title.target.value);
  };
  const handleDescriptionChange = (description: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(description.target.value);
  };
  const handleSummaryChange = (summary: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(summary.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setTitleValidation('');
    setDescriptionValidation('');
    setSummaryValidation('');

    const task = {
      title: title,
      categoryId: category.id,
      description: description,
      summary: summary,
      answers: answer,
    };
    try {
      fetch(config.backendURL + '/tasks/', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        if (response.status === 201) {
          props.handleAdd();
          props.close();
        } else if (response.status === 400) {
          response.json().then((responseData) => {
            if (responseData.title !== undefined) {
              setTitleValidation(responseData.title);
            }
            if (responseData.description !== undefined) {
              setDescriptionValidation(responseData.description);
            }
            if (responseData.summary !== undefined) {
              setSummaryValidation(responseData.summary);
            }
          });
        } else {
          console.error('Unexpected error while creating task');
        }
      });
    } catch (e) {
      if (typeof e === 'string') {
        console.error(e.toUpperCase());
      } else if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  return (
    <>
      <label className="required-label">required*</label>
      <form className="create-task-form" onSubmit={handleSubmit}>
        <Container>
          <Row align="end" style={{ marginBottom: '10px' }}>
            <Col className="input-column">
              {titleValidation !== '' ? <label style={{ color: 'red' }}>{titleValidation}</label> : ''}
              <label className="small-label">
                Title<label className="required-star">*</label>
              </label>
              <input
                className="small-input"
                type="text"
                name="title"
                placeholder="Title"
                required
                onChange={handleTitleChange}
                value={title}
              />
            </Col>

            <Col className="input-column">
              <label className="small-label">
                Category<label className="required-star">*</label>
              </label>
              <select
                className="category-dropdown"
                name="category"
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                {loadData.categories.map((category: any) => {
                  return (
                    <option key={category.id} value={JSON.stringify(category)}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          <Row align="center" style={{ marginBottom: '10px' }}>
            <Col className="input-column">
              {descriptionValidation !== '' ? <label style={{ color: 'red' }}>{descriptionValidation}</label> : ''}
              <label className="big-label">
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
          <Row align="center" style={{ marginBottom: '10px' }}>
            <Col className="input-column">
              {summaryValidation !== '' ? <label style={{ color: 'red' }}>{summaryValidation}</label> : ''}
              <label className="big-label">Summary</label>
              <input
                className="big-input summary-input"
                type="text"
                name="summary"
                placeholder="Summary"
                value={summary}
                onChange={handleSummaryChange}
              />
            </Col>
          </Row>
          <Row align="center" style={{ marginBottom: '10px' }}>
            <Col className="input-column">
              <label className="type-label" style={{ alignSelf: 'center' }}>
                Answer type<label className="required-star">*</label>
              </label>
              <select
                className="type-dropdown"
                name="type"
                required
                value={type}
                onChange={(event) => handleTypeChange(event.target.value)}
              >
                <option key="select" value="">
                  ---Select---
                </option>
                <option key="text" value="text">
                  Text
                </option>
                <option key="multiple" value="multiple">
                  Multiple choice
                </option>
              </select>
            </Col>
          </Row>
          {showTextAnswer && <TextAnswer answer={answer} handleAnswerChange={handleSingleAnswerChange} />}
          {showMultipleAnswer && <MultipleAnswer answer={answer} handleMultipleChange={handleMultipleChange} />}
          <Row align="center" style={{ marginTop: '20px' }}>
            <Col>
              <button className="button-primary" type="submit">
                Create
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    </>
  );
}

export default TaskCreationForm;
