import React, { useEffect } from 'react';
import './TaskCreation.css';
import jsonData from './categories.json';
import TextAnswer from './TextAnswer';
import MultipleAnswer from './MultipleAnswer';
import { Container, Row, Col } from 'react-grid-system';

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

  const [showTextAnswer, setShowTextAnswer] = React.useState(true);
  const [showMultipleAnswer, setShowMultipleAnswer] = React.useState(false);

  useEffect(() => {
    type === 'text' ? setShowTextAnswer(true) : setShowTextAnswer(false);
    type === 'multiple' ? setShowMultipleAnswer(true) : setShowMultipleAnswer(false);
  });

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
      category: category.name,
      description: description,
      creator: 'Default',
      answer: answer,
      date: today,
      votes: 0,
    };
    console.log(task);
    props.handleAdd(event, task);
    props.close();
  };

  return (
    <>
      <label className="required-label">required*</label>
      <div className="create-task-form">
        <form className="task-form" onSubmit={handleSubmit}>
          <Container>
            <Row align="end" style={{ height: '125px' }}>
              <Col>
                <label className="small-label">
                  Title<label className="required-star">*</label>
                </label>
                <br />
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

              <Col>
                <label className="small-label">
                  Category<label className="required-star">*</label>
                </label>
                <br />
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
            <Row align="center" style={{ height: '200px' }}>
              <Col>
                <label className="big-label">
                  Description<label className="required-star">*</label>
                </label>
                <br />
                <textarea
                  style={{ height: 100 }}
                  className="big-input"
                  name="description"
                  placeholder="Description"
                  required
                  onChange={handleDescriptionChange}
                  value={description}
                />
              </Col>
            </Row>
            <Row align="center" style={{ height: '80px' }}>
              <Col>
                <label className="big-label">Summary</label>
                <br />
                <input
                  className="big-input"
                  type="text"
                  name="summary"
                  placeholder="Summary"
                  value={summary}
                  onChange={handleSummaryChange}
                />
              </Col>
            </Row>
            <Row align="center" style={{ height: '100px' }}>
              <Col>
                <label className="type-label">
                  Answer type<label className="required-star">*</label>
                </label>
                <br />
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
            <Row align="center" style={{ height: '100px' }}>
              <Col>
                <button className="create-btn" type="submit">
                  CREATE
                </button>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </>
  );
}

export default TaskCreationForm;
