import { Col, Container, Row } from 'react-grid-system';
import React from 'react';

interface Props {
  handleDelete: any;
  close: () => void;
  id: number;
}

const DeleteConfirmationForm = (props: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleDelete(props.id);
    props.close();
  };

  const handleCancel = () => {
    props.close();
  };

  return (
    <>
      <form className="confirm-task-delete" onSubmit={handleSubmit}>
        <Container>
          <Row align="center" style={{ marginBottom: '10px' }}>
            <Col className="delete-task-column">
              <label className="delete-task-label" style={{ alignSelf: 'center' }}>
                Do you want to delete this task?
              </label>
            </Col>
          </Row>
          <Row className="task-delete-buttons" align="center" justify="center">
            <button type="submit" className="button-primary" style={{ backgroundColor: 'red' }}>
              Delete
            </button>
            <button onClick={handleCancel} className="button-secondary">
              Cancel
            </button>
          </Row>
        </Container>
      </form>
    </>
  );
};

export default DeleteConfirmationForm;
