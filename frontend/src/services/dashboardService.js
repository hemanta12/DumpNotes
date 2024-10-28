// src/services/dashboardService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notes';

const getNotes = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};
const createNote = async (noteData) => {
    const response = await axios.post(API_URL, noteData, { withCredentials: true });
    return response.data;
};

const dashboardService = {
    getNotes,
    createNote,
};

export default dashboardService;
