import EmptyModal from '../../components/EmptyModal';
import './TaskEdit.css';
import TaskEditForm from './TaskEditForm';

interface Props {
  show: boolean;
  close: () => void;
  handleModify: any;
  id: number;
}
export default function TaskEdit(props: Props) {
  return (
    <>
      <EmptyModal show={props.show} close={props.close} title="Change task">
        <div className="outer-div">
          <TaskEditForm handleModify={props.handleModify} close={props.close} id={props.id} />
        </div>
      </EmptyModal>
    </>
  );
}
