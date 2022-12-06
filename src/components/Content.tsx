import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';
import './content.css';

import CloseIcon from '@mui/icons-material/Close';

function Content({
  name,
  height,
  children,
  closeButtonClick,
  styleClasses,
  bootstrapColumnBreaks,
  style,
}: {
  name: String;
  height: string;
  children: React.ReactNode;
  closeButtonClick: () => void;
  styleClasses: string;
  bootstrapColumnBreaks: string;
  style: object;
}) {
  return (
    <main
      id="content"
      className={bootstrapColumnBreaks + ' ' + styleClasses}
      style={{ minHeight: height, maxHeight: height, ...style }}
    >
      <header className="content-header">
        <Typography variant="h5" style={{ color: 'white' }}>
          {name}
        </Typography>
        {typeof closeButtonClick !== 'undefined' && (
          <CloseIcon onClick={closeButtonClick} className="content-close-button"></CloseIcon>
        )}
      </header>
      <div className="content-inner">{children}</div>
    </main>
  );
}

Content.defaultProps = {
  closeButtonClick: undefined,
  height: '74.7vh',
  styleClasses: '',
  bootstrapColumnBreaks: 'col-xxl-8 col-xl-10 col-lg-11 col-md-12 col-sm-12 col-12',
  style: {},
};

export default Content;
