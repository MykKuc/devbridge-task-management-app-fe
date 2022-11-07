import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import { Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';



function App() {
  return (
    <>
    <Navbar/>
    <div className="App">
  <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
