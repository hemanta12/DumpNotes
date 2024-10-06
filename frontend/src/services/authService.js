import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
    });
    return response.data;
};

const register = async (userData) =>{
    const response = await axios.post(`${API_URL}/register`, userData, {
        withCredentials: true,
    });
    return response.data;
};

const logout = async() =>{
    await axios.post(`${API_URL}/logout`, {} , {
        withCredentials: true,
    });
};

const authService =  {
  login, register, logout,
};

export default authService;