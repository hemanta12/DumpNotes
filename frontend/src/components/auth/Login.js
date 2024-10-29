import React, {useState} from 'react'
import authService from '../../services/authService';
import {useNavigate, Link} from 'react-router-dom';
import '../../css/Login.css';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            await authService.login({username, password});
            onLogin();
            navigate('/dashboard');
        }catch(err){
            setError("Invalid Username or Password");
        }
    };


  return (
    <div className="login-container">
      <h1 className="site-title">
        <Link to="/" className="site-title-link">Dumpnotes</Link>
      </h1>

        <h2>Login</h2>

        <form onSubmit={handleLogin} className="login-form">
            <div className='form-group'>
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className='login-input'
                />
            </div>

            <div className='form-group'>
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     required
                    className='login-input'
                />
            </div>

            {error && <p className='error-message'>{error}</p>}
            <button 
                type='submit'  
                className='login-button'>Login
                </button>

            <p className="redirect-message">
                 Don't have an account?{' '}
                <Link to="/register" className="redirect-link">Register here</Link>
            </p>
        </form>
    </div>
  )
}

export default Login