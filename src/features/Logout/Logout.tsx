import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

export default function Logout() {
  const navigate = useNavigate();
  const [logoutRequest, setLogoutRequest] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('token') !== null) {
      fetch(config.backendURL + '/users/logout/', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
        .then((response) => {
          if (response.status === 204) {
            console.debug('logout successful');
            setLogoutRequest(false);
          } else {
            console.error('logout failed');
            setLogoutRequest(false);
          }
        })
        .then(() => {
          sessionStorage.removeItem('token');
          setLogoutRequest(false);
          navigate('/');
          window.location.reload();
        });
    }
  }, [logoutRequest]);

  return <></>;
}
