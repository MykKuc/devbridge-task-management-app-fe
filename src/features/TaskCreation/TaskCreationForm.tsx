import React, { useEffect, useState } from 'react';
import './TaskCreation.css';
import TextAnswer from './TextAnswer';
import MultipleAnswer from './MultipleAnswer';
import { Container, Row, Col } from 'react-grid-system';

interface Props {
  handleAdd: any;
  close: () => void;
}
function TaskCreationForm(props: Props) {
  // Fetch categories from the backend.
  const [categoriesFromDb, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/categories/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.log(error));
  });

  const initialAnswer = [{ text: '', correct: true }];
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [category, setCategory] = React.useState(jsonData.categories[0]);
  const [type, setType] = React.useState('');
  const [answer, setAnswer] = React.useState(initialAnswer);

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
    const today = new Date().toLocaleDateString();
    const task = {
      id: 100,
      title: title,
      category: category,
      description: description,
      author: 'Default',
      answer: answer,
      creationDate: today,
      score: 0,
    };
    console.log(task);
    props.handleAdd(event, task);
    props.close();
  };

  return (
    <>
      <label className="required-label">required*</label>
      <form className="create-task-form" onSubmit={handleSubmit}>
        <Container>
          <Row align="end" style={{ marginBottom: '10px' }}>
            <Col className="input-column">
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
                {categoriesFromDb.map((category: any) => {
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
