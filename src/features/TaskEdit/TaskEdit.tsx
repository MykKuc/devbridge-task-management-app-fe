import EmptyModal from '../../components/EmptyModal';
// import './TaskEdit.css';
import '../TaskCreation/TaskCreation.css'
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
      <EmptyModal
        show={props.show}
        close={props.close}
        title="Change task"
        height="70vh"
        bootstrapColumnBreaks="col-xxl-6 col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12"
      >
        <div className="outer-div">
          <TaskEditForm handleModify={props.handleModify} close={props.close} id={props.id} />
        </div>
      </EmptyModal>
    </>
  );
}
