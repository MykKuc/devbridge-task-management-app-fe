import * as React from 'react';
import SummaryEdit from './SummaryEdit';
import DescriptionEdit from './DescriptionEdit';
import AnswersEdit from './AnswersEdit';

interface Props {
  summary?: string;
  setSummary: Function;

  description?: string;
  setDescription: Function;
  descriptionValidation: string;

  historicalAnswerCount: number;
  answers?: { id: Number; text: String; correct: boolean }[];
  handleAnswerChange: Function;
  handleCheckmarkClick: Function;
  invalidAnswerIds: number[];
  invalidAnswerErrors: string[];
}
export default function LeftMenu(props: Props) {
  return (
    <div className="col-lg-7 text-start ">
      <SummaryEdit summary={props.summary} setSummary={props.setSummary} />
      <DescriptionEdit
        description={props.description}
        setDescription={props.setDescription}
        descriptionValidation={props.descriptionValidation}
      />
      <AnswersEdit
        historicalAnswerCount={props.historicalAnswerCount}
        answers={props.answers}
        handleAnswerChange={props.handleAnswerChange}
        handleCheckmarkClick={props.handleCheckmarkClick}
        invalidAnswerIds={props.invalidAnswerIds}
        invalidAnswerErrors={props.invalidAnswerErrors}
      />
    </div>
  );
}
