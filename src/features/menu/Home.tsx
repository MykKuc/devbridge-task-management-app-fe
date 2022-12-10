import React, { useState } from 'react';
import Content from '../../components/Content';
import config from '../../config';

function Home() {
  const [show, setShow] = useState(false);
  fetch(config.backendURL + '/ok').then((response) => {
    console.log(response);
    if (response.status == 200) {
      setShow(true);
    }
  });
  return (
    <Content name={'Home'} height={'60vh'}>
      <span>Hello world</span>
      {show && <label>Veikia API</label>}
    </Content>
  );
}

export default Home;
