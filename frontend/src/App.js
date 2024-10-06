import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path = "/login" element={<Login/>} />
        <Route path = "/register" element={<Register/>} />
        <Route path = "/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
