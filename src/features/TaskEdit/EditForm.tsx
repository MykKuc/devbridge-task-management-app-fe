import * as React from 'react';
import LeftMenu from './FormLeftPart/LeftMenu';
import RightMenu from './FormRightPart/RightMenu';

interface Props {
  summary: string;
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

  votes?: number;
  creator?: string;
  date?: string;
  category?: string;
  setCategory: Function;
}
export default function EditForm(props: Props) {
  return (
    <div className="row">
      <LeftMenu
        summary={props.summary}
        setSummary={props.setSummary}
        description={props.description}
        setDescription={props.setDescription}
        descriptionValidation={props.descriptionValidation}
        historicalAnswerCount={props.historicalAnswerCount}
        answers={props.answers}
        handleAnswerChange={props.handleAnswerChange}
        handleCheckmarkClick={props.handleCheckmarkClick}
        invalidAnswerIds={props.invalidAnswerIds}
        invalidAnswerErrors={props.invalidAnswerErrors}
      />
      <RightMenu
        votes={props.votes}
        creator={props.creator}
        date={props.date}
        category={props.category}
        setCategory={props.setCategory}
      />
    </div>
  );
}
