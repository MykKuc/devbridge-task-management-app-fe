import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import CategoryList from './pages/Categories/CategoryList'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
  <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<PageNotFound/>} />
      <Route path="/categorylist" element={<CategoryList/>} />
    </Routes>
    </div>
  );
}

export default App;
