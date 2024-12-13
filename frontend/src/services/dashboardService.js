// src/services/dashboardService.js

import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL.replace('/auth', '')}/notes`;

const getNotes = async () => {
    try {
        console.log('Fetching notes from:', API_URL);
        const response = await axios.get(API_URL, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response?.status === 403) {
            // Handle unauthorized access
            window.location.href = '/login';
        }
        throw error;
    }
};

const createNote = async (noteData) => {
    try {
        const response = await axios.post(API_URL, noteData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        if (error.response?.status === 403) {
            window.location.href = '/login';
        }
        throw error;
    }
};

const dashboardService = {
    getNotes,
    createNote,
};

export default dashboardService;
