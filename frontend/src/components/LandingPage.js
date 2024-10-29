// src/components/LandingPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../css/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className='landing-container'>
      <Header />

      {/* Main content */}
      <div className='landing-content'>
        <h1>Welcome to DumpNote</h1>
        <p>Your ultimate note-taking and idea-sharing platform.</p>

        <div className='landing-buttons'>
          <button className='landing-button' onClick={handleLoginClick}>
            Login
          </button>
          <button className='landing-button' onClick={handleRegisterClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
