import * as React from 'react';

interface Props {
  summary?: string;
  setSummary: Function;
}
export default function SummaryEdit(props: Props) {
  let summary = props.summary;
  let setSummary = props.setSummary;

  return (
    <>
      <label> Summary</label>
      <div className="overflow-auto " style={{ height: '100px' }}>
        <input
          onChange={(e) => setSummary(e.target.value)}
          value={summary !== null ? summary : ''}
          type={'text'}
          name={'summary'}
          id={'summary'}
          className={'input'}
          style={{ color: 'white', borderRadius: '10px', height: '40px' }}
          placeholder={'Summary'}
        />
      </div>
    </>
  );
}
