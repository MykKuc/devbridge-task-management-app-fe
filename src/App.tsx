import React from 'react';
import './App.css';
import Home from './features/menu/Home';
import PageNotFound from './features/menu/PageNotFound';
import { Route, Routes } from 'react-router-dom';
import Navbar from './features/menu/Navbar';
import Footer from './features/menu/Footer';
import Task from "./features/Task";

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
