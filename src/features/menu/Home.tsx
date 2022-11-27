import React, { useState } from 'react';
import Content from '../../components/Content';

function Home() {
  const [show, setShow] = useState(false);
  fetch('http://localhost:8080/api/ok').then((response) => {
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
