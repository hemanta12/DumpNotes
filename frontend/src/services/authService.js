import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
    });
    // Assuming the response contains the username
    if (response.data && response.data.username) {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem('isAuthenticated', 'true');
    }
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
    // Clear the username from local storage on logout
    localStorage.removeItem("username");
    localStorage.removeItem('isAuthenticated');
};
const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

const authService =  {
  login, register, logout,isAuthenticated
};


export default authService;