import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import categoryJsonData from '../../../pages/categories/MockCategories.json';
import * as React from 'react';
import VotesDisplay from './VotesDisplay';
import CreatorDisplay from './CreatorDisplay';
import DateDisplay from './DateDisplay';
import CategoryEdit from './CategoryEdit';

interface Props {
  votes?: number;
  creator?: string;
  date?: string;
  category?: string;
  setCategory: Function;
}
export default function RightMenu(props: Props) {
  return (
    <div
      className="col align-middle"
      style={{
        marginRight: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="row justify-content-center text-center" style={{ width: '250px' }}>
        <VotesDisplay votes={props.votes} />
        <div className=" separation" />
        <CreatorDisplay creator={props.creator} />
        <div className=" separation" />
        <DateDisplay date={props.date} />
        <div className=" separation" />
        <CategoryEdit category={props.category} setCategory={props.setCategory} />
        <div className=" separation" />
      </div>
    </div>
  );
}
