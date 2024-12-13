// src/services/dashboardService.js

import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/notes`;

const getNotes = async () => {
    const response = await axios.get(API_URL, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

const createNote = async (noteData) => {
    const response = await axios.post(API_URL, noteData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

const dashboardService = {
    getNotes,
    createNote,
};

export default dashboardService;
