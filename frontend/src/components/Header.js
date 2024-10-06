import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authService from '../services/authService';

const Header = () => {

    const navigate = useNavigate();

    const userLoggedIn = document.cookie.includes('JSESSIONID');

    const handleLogout= async() =>{
        await authService.logout();
        navigate('/login');
    };

  return (
    <header>
        <nav>
            <ul>
                {!userLoggedIn ? (
                    <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>

                    </>
                ):(
                    <>
                     <li><Link to="/dashboard">DashBoard</Link></li>
                     <li><button onClick={handleLogout}>Logout </button></li>
                    </>
                )}
            </ul>
        </nav>
    </header>
  );
};

export default Header