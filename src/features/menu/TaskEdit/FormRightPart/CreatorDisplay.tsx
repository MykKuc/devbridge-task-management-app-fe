import * as React from 'react';

interface Props {
  creator?: string;
}
export default function CreatorDisplay(props: Props) {
  let creator = props.creator;

  return (
    <div className="d-flex flex-row around justify-content-between">
      <label>Task author</label>
      <p>{creator}</p>
    </div>
  );
}
