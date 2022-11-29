import * as React from 'react';

interface Props {
  descriptionValidation: string;
  description?: string;
  setDescription: Function;
}
export default function DescriptionEdit(props: Props) {
  let descriptionValidation = props.descriptionValidation;
  let description = props.description;
  let setDescription = props.setDescription;

  return (
    <>
      {descriptionValidation !== '' ? <span style={{ color: 'red' }}>{descriptionValidation}</span> : ''}
      <div>
        <label> Description</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={'form-control overflow-auto'}
          placeholder={'description'}
          rows={3}
          style={{
            resize: 'none',
            background: '#383838',
            color: 'white',
            border: '2px solid var(--accent-color)',
          }}
        ></textarea>
      </div>
    </>
  );
}
