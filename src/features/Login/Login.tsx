import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';

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
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        {error ? <label id="error">{error}</label> : null}
        <div id="input">
          <label id="login-label">Email</label>
          <br />
          <input
            id="login-input"
            type="email"
            name="email"
            placeholder="Email@email.com"
            required
            value={logins.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div id="input">
          <label id="login-label">Password</label>
          <br />
          <input
            id="login-input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={logins.password}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div id="input">
          <button id="login-btn" type="submit" className="button">
            LOGIN
          </button>
        </div>
        <br />
        <NavLink id="reg" to="/register">
          Don't have an account? Click here to create one.
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
