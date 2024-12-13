import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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

const login = async (credentials) => {
    console.log('Attempting login to:', `${API_URL}/login`);
    const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (response.data.username) {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('isAuthenticated', 'true');
    }
    return response.data;
};

const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('username');
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/';
    }
};

const isAuthenticated = async () => {
    try {
        const response = await axios.get(`${API_URL}/check-auth`, {
            withCredentials: true
        });
        const isAuth = response.data.authenticated;
        localStorage.setItem('isAuthenticated', isAuth);
        return isAuth;
    } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        return false;
    }
};

const authService = {
    login, register, logout, isAuthenticated
};

export default authService;