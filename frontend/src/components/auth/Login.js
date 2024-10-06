import React, {useState} from 'react'
import authService from '../../services/authService';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            await authService.login({username, password});
            navigate('/dashboard');
        }catch(err){
            setError("Invalid Username or Password");
        }
    };


  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login