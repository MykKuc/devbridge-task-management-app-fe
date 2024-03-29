import React from 'react';
import './App.css';
import Home from './features/menu/Home';
import PageNotFound from './features/menu/PageNotFound';
import Tasks from './pages/Tasks/Tasks';
import { Route, Routes } from 'react-router-dom';
import Navbar from './features/menu/Navbar';
import Footer from './features/menu/Footer';
import CategoryList from './pages/categories/CategoryList';
import Login from './features/Login/Login';
import Logout from './features/Logout/Logout';
import Register from './features/register/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './pages/Task/Task';
import { LoginProvider } from 'features/menu/LoginContext';

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="categories" element={<CategoryList />} />
        </Routes>
        <Footer />
      </div>
    </LoginProvider>
  );
}

export default App;
