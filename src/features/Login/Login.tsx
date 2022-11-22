import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Content from '../../Components/Content';

function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [logins, setLogins] = useState({
    email: '',
    password: '',
  });

  // Handle inputs onChange to sync input value with local state
  const handleInputChange = (event: { target: { name: string; value: string } }) => {
    setLogins({ ...logins, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (logins.email === 'testas@testas' && logins.password === 'testas') {
      navigate('/tasks');
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <Content name={'Login'} height={'450px'} styleClasses={'col-sm-12 col-12'} style={{ maxWidth: '600px' }}>
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
          <button className="login-btn" type="submit">
            LOGIN
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
