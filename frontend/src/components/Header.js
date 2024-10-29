import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authService from '../services/authService';
import '../css/Header.css';

const Header = () => {

    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect( ()=>{
        const isLoggedIn = document.cookie.includes('JSESSIONID');
        setUserLoggedIn(isLoggedIn);
    }, []);



    const handleLogout= async() =>{
        await authService.logout();
        setUserLoggedIn(false);
        navigate('/login');
    };

  return (
    <header className="header">
        <nav className="nav">
            <ul className="nav-ul">
                {!userLoggedIn ? (
                    <>
                    <li className="nav-li">
                        <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    <li className="nav-li">
                        <Link to="/register" className="nav-link">Register</Link>
                        </li>

                    </>
                ):(
                    <>
                     <li className="nav-li">
                        <Link to="/dashboard" className="nav-link">DashBoard</Link>
                        </li>
                     <li className="nav-li">
                        <button onClick={handleLogout} className="logout-button">Logout </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    </header>
  );
};

export default Header