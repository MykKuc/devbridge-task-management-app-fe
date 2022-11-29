import * as React from 'react';
import AnswerField from './AnswerField';

interface Props {
  historicalAnswerCount: number;
  answers?: { id: number; text: string; isCorrect: boolean }[];
  invalidAnswerIds: number[];
  invalidAnswerErrors: string[];
  handleAnswerChange: Function;
  handleCheckmarkClick: Function;
}
export default function AnswersEdit(props: Props) {
  let historicalAnswerCount = props.historicalAnswerCount;

  return (
    <div>
      {props.invalidAnswerIds.length > 0 ? <span style={{ color: 'red' }}>(!)</span> : ''}
      <label style={{ paddingTop: '10px' }}> Answers </label>
      <div className="separation" />
      <div className="container">
        <div className="row" style={{ marginTop: '5px', marginBottom: '5px' }}>
          <div className="col-10">
            <span>
              <b>Answer</b>
            </span>
          </div>
          <div className="col-sm">
            <span>
              <b>Is correct?</b>
            </span>
          </div>
        </div>
        <div id={'answers'} style={{ overflowY: 'auto', overflowX: 'clip', height: '160px' }}>
          {props.answers !== undefined
            ? props.answers.map((answer) => {
                let rowId: string = 'answer-' + historicalAnswerCount;
                let idNum: number = historicalAnswerCount;
                historicalAnswerCount++;

                return (
                  <AnswerField
                    invalidAnswerIds={props.invalidAnswerIds}
                    invalidAnswerErrors={props.invalidAnswerErrors}
                    idNum={idNum}
                    rowId={rowId}
                    answer={answer}
                    answersLength={props.answers?.length}
                    handleAnswerChange={props.handleAnswerChange}
                    handleCheckmarkClick={props.handleCheckmarkClick}
                  />
                );
              })
            : ''}
        </div>
      </div>
    </div>
  );
}
