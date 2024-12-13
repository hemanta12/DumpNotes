import React, { useState } from 'react'
import authService from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log('Registration attempt with:', { username });
            const userData = {
                username: username,
                password: password
            };
            await authService.register(userData);
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                headers: err.response?.headers
            });
            setError("Registration failed: " + (err.response?.data?.message || err.message));
        }
    }

    return (
        <div className='register-container'>
            <h1 className="site-title">
                <Link to="/" className="site-title-link">Dumpnotes</Link>
            </h1>

            <h2>Register</h2>

            <form onSubmit={handleRegister} className='register-form'>
                <div className='form-group'>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="register-input"
                    />
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type='submit' className="register-button">Register</button>
                <p className="redirect-message">
                    Already have an account?{' '}
                    <Link to="/login" className="redirect-link">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;