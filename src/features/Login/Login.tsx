import React, { useState, useContext } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Content from '../../components/Content';
import config from '../../config';
import LoginContext from '../menu/LoginContext';

function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [logins, setLogins] = useState({
    email: '',
    password: '',
  });
  const { dark, toggleDark } = useContext(LoginContext);

  // Handle inputs onChange to sync input value with local state
  const handleInputChange = (event: { target: { name: string; value: string } }) => {
    setLogins({ ...logins, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const loginRequestBody = {
      email: logins.email,
      password: logins.password,
    };
    console.log(config.backend + '/users/login');
    fetch(config.backend + '/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          setError(null);
          return response.json();
        } else {
          setError('Incorrect Username or Password.');
          return Promise.reject('Incorrect username or password.');
        }
      })
      .then((body) => {
        sessionStorage.setItem('token', `${body.accessToken}`);
        fetch(config.backendURL + '/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
            Accept: 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            sessionStorage.setItem('current_user', data.name);
            sessionStorage.setItem('current_user_role', data.role);
          });
        if (toggleDark !== undefined) {
          toggleDark(true);
        }
        //Redirecting to some other page after login.
        const user = sessionStorage.getItem('current_user');
        console.log(user);
        navigate('/tasks');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Content name={'Login'} height={'450px'} bootstrapColumnBreaks={'col-sm-12 col-12'} style={{ maxWidth: '600px' }}>
      <form onSubmit={handleSubmit}>
        {error ? <label className="login-error">{error}</label> : null}
        <div className="login-input-wrapper">
          <label className="login-label">Email</label>
          <br />
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Email@email.com"
            required
            value={logins.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="login-input-wrapper">
          <label className="login-label">Password</label>
          <br />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={logins.password}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="login-input-wrapper">
          <button className="button-primary" type="submit">
            Login
          </button>
        </div>
        <br />
        <NavLink className="registration-link" to="/register">
          Don't have an account? Click here to create one.
        </NavLink>
      </form>
    </Content>
  );
}

export default Login;
