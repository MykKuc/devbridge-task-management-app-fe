import { useState } from 'react';
import './TaskCreation.css';
import { Row, Col } from 'react-grid-system';

interface Props {
  answer: {
    text: string;
  }[];
  handleAnswerChange: any;
}

const TextAnswer: React.FC<Props> = ({ answer, handleAnswerChange }) => {
  const [ans, setAnswer] = useState(answer[0].text);
  const handleInput = (answer: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleAnswerChange(answer.target.value);
    setAnswer(answer.target.value);
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
          value={ans}
          onChange={handleInput}
        />
      </Col>
    </Row>
  );
};

export default TextAnswer;
