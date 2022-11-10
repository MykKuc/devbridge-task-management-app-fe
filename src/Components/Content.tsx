import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';
import './content.css'

function Content({ name, height, children }: { name: String, height: string, children: any }) {
  return (
    <main id='content' className='col-xxl-8 col-xl-10 col-lg-11 col-md-12 col-sm-12 col-12' style={{ minHeight: height, maxHeight: height }}>
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
  height: '74.7vh'
};

export default Content;