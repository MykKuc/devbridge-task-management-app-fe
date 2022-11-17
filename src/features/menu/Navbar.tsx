import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import { NavLink } from 'react-router-dom';
import ProfileIcon from './assets/profile-icon-white.png';
import Logo from '../../logo_filled.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './navbar.css'

export default function Navbar() {
  return (
    <div className='navbar-container'>
      <nav className="navbar navbar-expand-xl navbar-dark">
        <div className="navbar-inner">
          <div className="navbar-brand-wrapper">
            <NavLink
              className="navbar-brand"
              to="/"
              style={{ fontSize: 35, fontFamily: 'Julius' }}
            >
              ADMISSION TOOL
            </NavLink>
          </div>
          <ul className="navbar-nav navbar-menu-wrapper d-none d-xl-flex">
            <li className="logo-left nav-item">
              <NavLink
                className="nav-link text-white hover-underline"
                to="/tasks"
              >
                Tasks
              </NavLink>
            </li>
            <li className="logo-wrapper nav-item">
              <NavLink to="/" className="nav-link">
                <img className="logo expand" src={Logo} alt="logo" />
              </NavLink>
            </li>
            <li className="logo-right nav-item">
              <NavLink
                className="nav-link text-white hover-underline"
                aria-current="page"
                to="/categories"
              >
                Categories
              </NavLink>
            </li>
          </ul>
          <div className="navbar-login-wrapper d-none d-xl-flex">
            <div className="nav-item">
              <NavLink
                className="nav-link text-white"
                aria-current="page"
                to="/login"
              >
                <img src={ProfileIcon} alt="profile" className="px-1 pb-1" style={{ height: 35, fontSize: 30 }} />
                Login
              </NavLink>
            </div>
          </div>
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggle-menu" aria-controls="navbar-toggle-menu" aria-expanded="false" aria-label="Toggle navigation">
            <ExpandMoreIcon />
          </button>
        </div>
      </nav>
      <div className="collapse d-xl-none" id="navbar-toggle-menu">
        <div className="inner-toggle-menu p-4">
          <NavLink
            className="nav-link text-white hover-underline"
            to="/tasks"
          >
            Tasks
          </NavLink>
          <NavLink
            className="nav-link text-white hover-underline"
            aria-current="page"
            to="/categories"
          >
            Categories
          </NavLink>
          <NavLink
            className="nav-link hover-underline"
            aria-current="page"
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}
