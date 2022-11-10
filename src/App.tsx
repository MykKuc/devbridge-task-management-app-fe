import React from 'react';
import './App.css';
import Home from './features/menu/Home';
import PageNotFound from './features/menu/PageNotFound';
import Tasks from './pages/Tasks/Tasks';
import { Route, Routes } from 'react-router-dom';
import Navbar from './features/menu/Navbar';
import Footer from './features/menu/Footer';
import CategoryList from './pages/categories/CategoryList';
import LoginPage from './features/Login/LoginPage';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path="categories" element={<CategoryList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
