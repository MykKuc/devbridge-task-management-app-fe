import React, { useEffect, useState } from 'react';
import './TaskEdit.css';
import TextAnswer from './TextAnswer';
import MultipleAnswer from './MultipleAnswer';
import { Container, Row, Col } from 'react-grid-system';
import config from '../../config';

interface User {
  id: Number;
  name: String;
}

interface Category {
  id: Number;
  name: String;
}

interface Answer {
  id: Number;
  text: String;
  correct: boolean;
}

interface TaskData {
  id: Number;
  title: String;
  description: String;
  summary: String;
  creationDate: Date;
  score: Number;
  user: User;
  category: Category;
  answers: Answer[];
}

interface Category {
  id: Number;
  name: String;
}

interface Props {
  handleModify: any;
  close: () => void;
  id: number;
}
function TaskCreationForm(props: Props) {
  const [categoriesFromDb, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetch(config.backendURL + '/categories/options', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  const initialAnswer = [{ id: 0, text: '', correct: true }];
  let url = 'http://localhost:8080/api/tasks/' + props.id;

  const [task, setTask] = React.useState<TaskData>();

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [category, setCategory] = React.useState<Category>();
  const [type, setType] = React.useState('');
  const [answer, setAnswer] = React.useState<Answer[]>(initialAnswer);

  const [showTextAnswer, setShowTextAnswer] = React.useState(true);
  const [showMultipleAnswer, setShowMultipleAnswer] = React.useState(false);

  useEffect(() => {
    type === 'text' ? setShowTextAnswer(true) : setShowTextAnswer(false);
    type === 'multiple' ? setShowMultipleAnswer(true) : setShowMultipleAnswer(false);
  });

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
        }
      })
      .then((data) => {
        setTask(data);
      });
  }, []);
  useEffect(() => {
    if (task !== undefined) {
      setTitle(task?.title as string);
      setDescription(task?.description as string);
      setSummary(task?.summary as string);
      setCategory(task?.category);
      if (task?.answers.length === 1) {
        setType('text');
      } else {
        setType('multiple');
      }
      let ans = [];
      for (let i = 0; i < task.answers.length; i++) {
        ans.push({ id: task.answers[i].id, text: task.answers[i].text as string, correct: task.answers[i].correct });
      }
      setAnswer(ans);
    }
  }, [task]);
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
      newAnswer.push({ id: -1, text: answer, correct: true });
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
    const today = new Date().toLocaleDateString();
    const newTask = {
      id: task?.id,
      title: title,
      category: category,
      description: description,
      answers: answer,
      summary: summary,
    };
    console.log(newTask);
    props.handleModify(newTask);
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
                  value={title as string}
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
                  value={description as string}
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
                  value={summary as string}
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
                  SUBMIT
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
