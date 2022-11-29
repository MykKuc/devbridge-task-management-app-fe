import * as React from 'react';

interface Props {
  date?: string;
}
export default function DateDisplay(props: Props) {
  let date = props.date;

  return (
    <div className="d-flex flex-row around justify-content-between">
      <label>Date of creation</label>
      <p>{date}</p>
    </div>
  );
}
