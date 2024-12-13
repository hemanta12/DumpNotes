import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const login = async (credentials) => {
    console.log('Attempting login to:', `${API_URL}/login`);
    const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (response.data && response.data.username) {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem('isAuthenticated', 'true');
    }
    return response.data;
};

const register = async (userData) => {
    console.log('Attempting registration to:', `${API_URL}/register`);
    const response = await axios.post(`${API_URL}/register`, userData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
};

const logout = async () => {
    await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    localStorage.removeItem("username");
    localStorage.removeItem('isAuthenticated');
};

const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
};

const authService = {
    login, register, logout, isAuthenticated
};

export default authService;