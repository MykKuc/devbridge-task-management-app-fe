import * as React from 'react';

interface Props {
  invalidAnswerIds: number[];
  invalidAnswerErrors: string[];
  idNum: number;
  rowId: string;
  answer?: { id: Number; text: String; correct: boolean };
  answersLength?: number;
  handleAnswerChange: Function;
  handleCheckmarkClick: Function;
}
export default function AnswerField(props: Props) {
  let invalidAnswerIds = props.invalidAnswerIds;
  let invalidAnswerErrors = props.invalidAnswerErrors;
  let idNum = props.idNum;
  let rowId = props.rowId;
  let answer = props.answer;
  let answersLength = props.answersLength;
  let handleAnswerChange = props.handleAnswerChange;
  let handleCheckmarkClick = props.handleCheckmarkClick;

  return (
    <>
      {invalidAnswerIds.includes(idNum) ? <span style={{ color: 'red' }}>{invalidAnswerErrors[idNum]}</span> : ''}
      <div id={rowId} className={'row'} style={{ marginBottom: '5px' }}>
        <div className={'col-10'}>
          <input
            onChange={(e) => handleAnswerChange(idNum, e.target.value)}
            className={'input answer'}
            type={'text'}
            key={answer?.id as number}
            value={answer?.text as string}
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className={'col-sm'} style={{ textAlign: 'center' }}>
          {answersLength === 1 || answer?.correct ? (
            <input
              onClick={(e) => handleCheckmarkClick(idNum)}
              type={'checkbox'}
              name={answer?.id.toString()}
              defaultChecked={true}
            />
          ) : (
            <input onClick={(e) => handleCheckmarkClick(idNum)} type={'checkbox'} name={answer?.id.toString()} />
          )}
        </div>
      </div>
    </>
  );
}
