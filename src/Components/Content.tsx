import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';
import './content.css'

function Content({ name, children }: { name: String, children: any }) {
  return (
    <main id='content' className='col-xxl-8 col-xl-10 col-lg-11 col-md-12 col-sm-12 col-12'>
      <header className='content-header'>
        <Typography variant='h5' style={{ color: 'white' }}>
          {name}
        </Typography>
      </header>
      {children}
    </main>
  )
}

export default Content;