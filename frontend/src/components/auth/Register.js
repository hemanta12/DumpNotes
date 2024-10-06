import React, {useState} from 'react'
import authService from '../../services/authService';
import {useNavigate} from 'react-router-dom';

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
    <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
            <div>
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p>{error}</p>}
            <button type='submit'>Register</button>
        </form>
    </div>
  );
};

export default Register;