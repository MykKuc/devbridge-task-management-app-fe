import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import ThemeContext from '../menu/LoginContext';

export default function Logout() {
  const navigate = useNavigate();
  const [logoutRequest, setLogoutRequest] = useState(true);
  const { dark, toggleDark } = useContext(ThemeContext);

  useEffect(() => {
    fetch(config.backendURL + '/users/logout/', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token') ?? '',
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
        if (toggleDark !== undefined) {
          toggleDark(false);
        }
        navigate('/');
      });
  }, [logoutRequest]);

  return <></>;
}
