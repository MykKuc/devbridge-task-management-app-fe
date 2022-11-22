import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';
import './content.css'

function Content({ name, height, children, styleClasses, style }: { name: String, height: string, children: any, styleClasses: string, style: object }) {
  return (
    <main id='content' className={styleClasses} style={{ minHeight: height, maxHeight: height, ...style }}>
      <header className='content-header'>
        <Typography variant='h5' style={{ color: 'white' }}>
          {name}
        </Typography>
      </header>
      <div className="content-inner">
        {children}
      </div>
    </main>
  )
}

Content.defaultProps = {
  height: '74.7vh',
  styleClasses: 'col-xxl-8 col-xl-10 col-lg-11 col-md-12 col-sm-12 col-12',
  style: {}
};

export default Content;