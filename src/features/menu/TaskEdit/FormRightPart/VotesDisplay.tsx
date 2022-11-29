import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import * as React from 'react';

interface Props {
  votes?: number;
}
export default function VotesDisplay(props: Props) {
  let votes = props.votes;

  return (
    <>
      <div style={{ color: 'white' }}>
        <ThumbUpIcon />
      </div>
      <p style={{ textAlign: 'center' }}>{votes}</p>
    </>
  );
}
