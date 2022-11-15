import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography, FormControl, Select, MenuItem } from '@mui/material';
import { borderColor } from '@mui/system';
import './Register.css';

export default function Register() {
  const initialUserState = {
    id: null,
    fullName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: '',
  };
  const [validation, SetValidation] = useState({
    formErrors: { fullName: '', email: '', password: '', role: '' },
    fullNameValid: true,
    emailValid: true,
    passwordValid: true,
    roleValid: true,
  });
  const [user, setUser] = useState(initialUserState);
  const [formValid, setFormValid] = useState(false);
  const [scroll, setScroll] = useState('');
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (formValid) {
      saveUser();
      window.location.href = '/login';
    }
  }, [formValid]);
  useEffect(() => {
    if (
      document.getElementById('form') &&
      document.getElementById('form')!.scrollHeight &&
      document.getElementById('form')!.scrollHeight > 650
    ) {
      setScroll('scroll');
    }
    if (!firstUpdate.current) {
      setFormValid(
        validation.fullNameValid && validation.emailValid && validation.passwordValid && validation.roleValid
      );
    }
  }, [validation]);

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }
  function handleFormSubmit() {
    firstUpdate.current = false;
    validateFields();
  }
  function saveUser() {
    const { passwordRepeat, ...userData } = user;
    //UserDataService.create(userData){}    SAVE USER TO DB
  }

  function validateFields() {
    let fieldValidationErrors = validation.formErrors;
    let fullNameValid = validation.fullNameValid;
    let emailValid = validation.emailValid;
    let passwordValid = validation.passwordValid;
    let roleValid = validation.roleValid;

    fullNameValid = user.fullName.length > 0;
    fieldValidationErrors.fullName = fullNameValid ? '' : 'Name is not entered.';

    let emailValidLength = user.email.length > 0;
    emailValid = user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
    fieldValidationErrors.email = emailValidLength
      ? emailValid
        ? ''
        : 'Email is not correct'
      : 'Email is not entered';
    emailValid = emailValid && emailValidLength;

    let passwordMatches = user.password === user.passwordRepeat;
    let passwordValidLength = user.password.length > 5;
    const hasNumber = user.password.match(/(\d+)/) !== null;
    const hasUpper = user.password.match(/([A-Z]+)/) !== null;
    const hasSymbol = user.password.match(/(\W+)/) !== null;
    passwordValid = hasNumber && (hasUpper || hasSymbol);
    fieldValidationErrors.password = passwordValidLength
      ? passwordMatches
        ? passwordValid
          ? ''
          : 'Password does not have a upper letter or a symbol, and a number'
        : 'Passwords do not match'
      : 'Password does not contain 6 characters';
    passwordValid = passwordValid && passwordValidLength && passwordMatches;

    roleValid = user.role.length > 0;
    fieldValidationErrors.role = roleValid ? '' : 'Role is not selected';

    SetValidation({
      formErrors: fieldValidationErrors,
      fullNameValid: fullNameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      roleValid: roleValid,
    });
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="col-8 px-0 pb-3" style={{ backgroundColor: '#383838', borderRadius: '20px 20px 20px 20px' }}>
          <header className="text-light header py-2 mb-3">Register</header>
          <div className={`py-5 d-flex justify-content-center ${scroll}`} id="form" style={{ maxHeight: 650 }}>
            <div className="form-group col-4 text-start text-light">
              <label className="ps-1 label" htmlFor="fullName">
                Full name
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="input"
                value={user.fullName}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                  if (/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                name="fullName"
                id="fullName"
              />
              {!validation.fullNameValid && <p className="alert alert-danger">{validation.formErrors.fullName}</p>}

              <label className="ps-1 mt-3 label" htmlFor="fullName">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input"
                value={user.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
              {!validation.emailValid && <p className="alert alert-danger">{validation.formErrors.email}</p>}

              <label className="ps-1 mt-3 label" htmlFor="fullName">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={user.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
              {!validation.passwordValid && <p className="alert alert-danger">{validation.formErrors.password}</p>}

              <label className="ps-1 mt-3 label" htmlFor="fullName">
                Repeat password
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                className="input"
                value={user.passwordRepeat}
                onChange={handleInputChange}
                name="passwordRepeat"
                id="passwordRepeat"
              />
              <Typography className="ps-1 mt-3 label">Role</Typography>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  name="role"
                  value={user.role}
                  className="label"
                  style={{ boxShadow: '5px 20px 15px rgba(0, 0, 0, 0.25)' }}
                  onChange={handleInputChange}
                  displayEmpty
                  renderValue={(value) => (value !== '' ? value : 'Select role')}
                  sx={{
                    '.MuiSvgIcon-root ': {
                      fill: '#2babd3',
                    },

                    icon: {
                      fill: 'white',
                    },
                    color: 'white',
                    border: '2px solid #2babd3',
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value={'Mentor'}>Mentor</MenuItem>
                  <MenuItem value={'Employee'}>Employee</MenuItem>
                </Select>
              </FormControl>

              {!validation.roleValid && <p className="alert alert-danger">{validation.formErrors.role}</p>}
              <div className="text-center">
                <button type="submit" onClick={handleFormSubmit} className="button my-5 text-center">
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
