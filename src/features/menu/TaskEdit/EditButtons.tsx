import * as React from 'react';

interface Props {
  handleClose: () => void;
  saveTaskEditChanges: () => void;
}
export default function EditButtons(props: Props) {
  let handleClose = props.handleClose;
  let saveTaskEditChanges = props.saveTaskEditChanges;
  return (
    <div className={'row'}>
      <div>
        <button className={'btn btn-secondary btn-lg float-end'} onClick={handleClose}>
          CANCEL
        </button>
        <button className={'btn btn-primary btn-lg float-end'} onClick={saveTaskEditChanges}>
          SAVE
        </button>
      </div>
    </div>
  );
}
