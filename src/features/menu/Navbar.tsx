import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '@sourcery-admission-tool/public/profile-icon-white.png';
import Logo from '@sourcery-admission-tool/public/logo.png';

export default function Navbar() {
  let activeStyle = {
    backgroundColor: '#383838',
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark mb-5"
      style={{ backgroundColor: '#2c2c2c', height: 100, boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.35)' }}
    >
      <div className="container-fluid ms-4" style={{ fontSize: 30 }}>
        <div className="row" style={{ width: '100%' }}>
          <div className="col-lg-2 col-sm-4 align-middle py-2">
            <div className="d-none d-xxl-block">
              <NavLink
                className="navbar-brand collapse navbar-collapse"
                to="/"
                style={{ fontSize: 35, fontFamily: 'Julius' }}
                id="navbarSupportedContent"
              >
                ADMISSION TOOL
              </NavLink>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div className="col">
            <div
              className="collapse navbar-collapse"
              style={{ flexDirection: 'row-reverse' }}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white px-4 rounded-pill"
                    aria-current="page"
                    to="/add-task"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Add Task
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white px-4 rounded-pill"
                    to="/tasks"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Tasks
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-1 ">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={Logo} alt="logo" style={{ height: 200, position: 'absolute', top: -11 }} />
            </div>
          </div>
          <div className="col">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <NavLink
                    className="nav-link text-white px-4 rounded-pill"
                    aria-current="page"
                    to="/categories"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className="nav-link text-white px-4 rounded-pill"
                    to="/"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Home
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4">
            <ul className="navbar-nav me-auto" style={{ flexDirection: 'row-reverse' }}>
              <li className="nav-item border rounded-pill px-1">
                <NavLink
                  className="nav-link active rounded-pill"
                  aria-current="page"
                  to="/login"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <img src={ProfileIcon} alt="profile" className="px-1 pb-1" style={{ height: 35, fontSize: 30 }} />
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
