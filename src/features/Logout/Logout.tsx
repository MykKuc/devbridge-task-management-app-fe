import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

export default function Logout() {
  const navigate = useNavigate();
  const [logoutRequest, setLogoutRequest] = useState(true);
  const ftw = sessionStorage.getItem('token');

  useEffect(() => {
    if (ftw !== null) {
      fetch(config.backendURL + '/users/logout/', {
		method: 'PUT',
        headers: {  
          Authorization: 'Bearer ' + ftw.toString(),
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.debug('logout successful');
            sessionStorage.setItem('token', '');
            setLogoutRequest(false);
          } else {
            console.error('logout failed');
            setLogoutRequest(false);
          }
        })
        .then(() => {
          sessionStorage.setItem('token', '');
          setLogoutRequest(false);
          navigate('/');
        });
    }
  }, [logoutRequest]);

  return <></>;
}
