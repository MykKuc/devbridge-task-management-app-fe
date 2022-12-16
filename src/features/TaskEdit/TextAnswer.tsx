import { useState } from 'react';
// import './TaskEdit.css';
import '../TaskCreation/TaskCreation.css'
import { Row, Col } from 'react-grid-system';

interface Answer {
  id: Number;
  text: String;
  correct: boolean;
}
interface Props {
  answer: Answer[];
  handleAnswerChange: any;
}

const TextAnswer: React.FC<Props> = ({ answer, handleAnswerChange }) => {
  const [ans, setAnswer] = useState(answer[0]);
  const handleInput = (answer: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleAnswerChange(answer.target.value);
    setAnswer({ id: ans.id, text: answer.target.value, correct: ans.correct });
  };
  return (
    <Row>
      <Col>
        <label className="big-label">
          Correct answer<label className="required-star">*</label>
        </label>
        <br />
        <textarea
          style={{ height: 100 }}
          className="big-input"
          name="answer"
          placeholder="Answer"
          required
          value={ans.text as string}
          onChange={handleInput}
        />
      </Col>
    </Row>
  );
};

export default TextAnswer;
