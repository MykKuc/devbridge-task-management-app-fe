import React from 'react';
import './App.css';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Tasks from './pages/Tasks/Tasks';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
