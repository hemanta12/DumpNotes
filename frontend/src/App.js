import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import authService from './services/authService';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(authService.isAuthenticated());

 const handleLogin = () =>{
  setUserLoggedIn(true);
 }
 const handleLogout = () => {
  setUserLoggedIn(false);
};
  return (
    <Router>
      <Routes>
        <Route 
              path="/"
              element={
                !userLoggedIn?(
                  <LandingPage userLoggedIn={userLoggedIn} onLogout= {handleLogout}/>
                ):(
                  <Navigate to="/dashboard" replace/>
                )
              }
        />
        <Route 
            path = "/login" 
            element={
              !userLoggedIn? (
                <Login onLogin = {handleLogin}/>
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
        />
        <Route 
            path = "/register" 
            element={
              !userLoggedIn ? (
                <Register onRegister={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
        } 
        />
        <Route 
            path = "/dashboard" 
            element={
              userLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
        />

        <Route
          path="*"
          element={
            userLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
