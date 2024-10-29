import React, {useState} from 'react'
import authService from '../../services/authService';
import {useNavigate, Link} from 'react-router-dom';
import '../../css/Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async(e)=>{
        e.preventDefault();
        try {
            await authService.register({username, password});
            navigate('/login');
        }catch(err){
            setError("Registration failed");
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